<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <home-swiper :banners="banners"></home-swiper>
        <recommend-view :recommeds="recommends"></recommend-view>
        <!-- <li v-for="item in banners">{{item}}</li> -->
        <feature-view></feature-view>
        <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick"></tab-control>
        <goods-list :goods="showGoods"></goods-list>
    </div>
</template>
<script>
    //轮播
    import HomeSwiper from 'views/home/childComps/HomeSwiper.vue'
    //推荐
    import RecommendView from "views/home/childComps/RecommendView.vue"
    //推荐
    import FeatureView from "views/home/childComps/FeatureView.vue"

    //列表 
    import GoodsList from 'components/content/goods/GoodsList.vue'
    //导航
    import NavBar from 'components/common/navbar/NavBar.vue'
    //选项卡 
    import TabControl from 'components/content/tabControl/TabControl.vue'
    //网络请求数据
    import { getHomeMultidata, getHomeGoods } from 'network/home.js'
    export default {
        name: 'Home',
        components: {
            HomeSwiper,
            RecommendView,
            FeatureView,
            GoodsList,
            NavBar,
            TabControl,
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
                currentType:"pop"
            }
        },
        computed:{ 
            //计算切换的数据
            showGoods(){
                    return this.goods[this.currentType].list
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
        methods: {
            /* 事件监听相关的方法 */
            tabClick(index) {
                console.log(index);
                switch(index){ 
                    case 0: 
                        this.currentType="pop"
                        break;
                    case 1: 
                        this.currentType="new"
                        break;
                    case 2: 
                        this.currentType="sell"
                        break;
                }
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
                })
            },
        }
    }
</script>
<style scoped>
    #home {
        padding-top: 44px;
    }

    .home-nav {
        background: var(--color-tint);
        color: #fff;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 9;
    }

    .tab-control {
        /* 吸顶 */
        position: sticky;
        top: 44px;
        z-index: 99;
    }
</style>