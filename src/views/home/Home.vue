<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <tab-control class="tab-control" v-show="isTabFixed" :titles="['流行','新款','精选']" @tabClick="tabClick"
            ref="tabControl1"></tab-control>
        <b-scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll" @pullingUp="loadMore"
            :pullUpLoad="true">
            <home-swiper :banners="banners" @swiperItemLoad="swiperItemLoad"></home-swiper>
            <recommend-view :recommeds="recommends"></recommend-view>
            <!-- <li v-for="item in banners">{{item}}</li> -->
            <feature-view></feature-view>
            <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2">
            </tab-control>
            <goods-list :goods="showGoods"></goods-list>
        </b-scroll>
        <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    </div>
</template>
<script>
    // 视图组件类
    //轮播
    import HomeSwiper from 'views/home/childComps/HomeSwiper.vue'
    //推荐
    import RecommendView from "views/home/childComps/RecommendView.vue"
    //推荐
    import FeatureView from "views/home/childComps/FeatureView.vue"
    //公共组件类
    //列表 
    import GoodsList from 'components/content/goods/GoodsList.vue'
    //导航
    import NavBar from 'components/common/navbar/NavBar.vue'
    //选项卡 
    import TabControl from 'components/content/tabControl/TabControl.vue'
    //滚动 
    import BScroll from "components/common/bscroll/BScroll.vue"
    //返回 
    import BackTop from "components/content/backTop/BackTop.vue"

    //网络请求数据类
    import { getHomeMultidata, getHomeGoods } from 'network/home.js'

    //js工具  
    import { debounce } from "common/utils.js"
    export default {
        name: 'Home',
        components: {
            HomeSwiper,
            RecommendView,
            FeatureView,
            GoodsList,
            NavBar,
            TabControl,
            BScroll,
            BackTop
        },
        data() {
            return {
                banners: [],
                recommends: [],
                goods: {
                    'new': { page: 0, list: [] },
                    'pop': { page: 0, list: [] },
                    'sell': { page: 0, list: [] }
                },
                currentType: "pop",
                isShowBackTop: false,
                tabOffsetTop: 0,
                isTabFixed: false
            }
        },
        computed: {
            //计算切换的数据
            showGoods() {
                return this.goods[this.currentType].list;
            }
        },
        created() {
            // 1.请求多个数据
            this._getHomeMultidata();
            //2.请求商品数据列表
            //流行
            this._getHomeGoods("pop");
            //新款
            this._getHomeGoods("new");
            //精选
            this._getHomeGoods("sell");

        },
        mounted() {
            const refresh = debounce(this.$refs.scroll.refresh, 50);
            this.$bus.$on("itemImageLoad", () => {
                //  console.log("------");
                // this.$refs.scroll.refresh();
                refresh();
            })
        },
        methods: {
            // // 事件监听防抖节流  
            // debounce(func, delay) {
            //     let timer = null;
            //     return function (...args) {
            //         // console.log(args);
            //         if (timer) clearTimeout(timer)
            //         timer = setTimeout(() => {
            //             func(this, args)
            //         }, delay)
            //     }
            // },
            swiperItemLoad() {
                this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
            },
            //上拉加载更多
            loadMore() {
                console.log("上拉加载更多");
                this._getHomeGoods(this.currentType);
                //刷新可滚动的区域
                this.$refs.scroll.refresh();
            },
            //监听滚动的事件
            contentScroll(position) {
                //判断滚动条的是否大于1000,如果是这返回true
                //1.判断BackTop是否显示
                this.isShowBackTop = (-position.y) > 1000;
                // if (position.y <= -500) {
                //     this.isShowBackTop = true;
                // } else {
                //     this.isShowBackTop = false;
                // }
                //2.选定tabControl是否吸顶(position:fixed)
                this.isTabFixed = (-position.y) > this.tabOffsetTop;
            },
            backClick() {
                //调用
                // this.$refs.scroll.scroll.scrollTo(0,0,600);
                this.$refs.scroll.scrollTo(0, 0);
            },
            /* 事件监听相关的方法 */
            tabClick(index) {
                // console.log(index);
                switch (index) {
                    case 0:
                        this.currentType = "pop"
                        break;
                    case 1:
                        this.currentType = "new"
                        break;
                    case 2:
                        this.currentType = "sell"
                        break;
                }
                this.$refs.tabControl1.currentIndex = index;
                this.$refs.tabControl2.currentIndex = index;
            },
            /* 网络请求相关的方法 */
            _getHomeMultidata() {
                getHomeMultidata().then(res => {
                    //轮播图数据
                    this.banners = res.data.data.banner.list;
                    //推荐数据
                    this.recommends = res.data.data.recommend.list;
                    // console.log(res);
                });
            },
            _getHomeGoods(type) {
                const page = this.goods[type].page + 1;
                getHomeGoods(type, page).then(res => {
                    //   console.log(res);
                    this.goods[type].list.push(...res.data.data.list);
                    this.goods[type].page += 1;
                    this.$refs.scroll.finishPullUp();
                })
            },
        }
    }
</script>
<style scoped>
    #home {
        /* padding-top: 44px; */
        height: 100vh;
        position: relative;
    }

    .home-nav {
        background: var(--color-tint);
        color: #fff;
        /* position: fixed;
        left: 0;
        right: 0;
        top: 0; */
        z-index: 9;
    }

    .tab-control {
        /* 吸顶 */
        /* position: sticky;
        top: 44px;
        z-index: 99; */
        position: relative;
        top: -1px;
        z-index: 9;
    }

    .content {
        /* margin-top: 44px; */
        /* height: calc(100% - 93px);
        overflow: hidden; */
    }

    .content {
        overflow: hidden;
        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
    }

    /* 吸顶效果 */
</style>