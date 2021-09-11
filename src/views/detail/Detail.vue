<template>
  <div id="detail" v-cloak>
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" :pullUpLoad="true" :probeType="3" @pullingUp="pullingUp"
      @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-image-info :images-info="shopInfo" @imageLoad="imageLoad"></detail-image-info>
      <detail-param-info :paramInfo="paramsInfo" ref="param"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="goodsList"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addTopCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>
<script>
  import DetailNavBar from 'views/detail/childComps/DetailNavBar.vue'
  import DetailSwiper from 'views/detail/childComps/DetailSwiper.vue'
  import DetailBaseInfo from 'views/detail/childComps/DetailBaseInfo.vue'
  import DetailShopInfo from 'views/detail/childComps/DetailShopInfo.vue'
  import DetailImageInfo from 'views/detail/childComps/DetailImageInfo.vue'
  import DetailParamInfo from 'views/detail/childComps/DetailParamInfo.vue'
  import DetailCommentInfo from 'views/detail/childComps/DetailCommentInfo.vue'
  import DetailBottomBar from 'views/detail/childComps/DetailBottomBar.vue'
  import BackTop from "components/content/backTop/BackTop.vue"


  import Scroll from 'components/common/bscroll/BScroll.vue'
  import GoodsList from 'components/content/goods/GoodsList.vue'
  import { debounce } from "common/utils.js"
  import { itemListenerMixin } from "common/mixin.js"
  //Detail 商品详情网络请求
  import { getDetail, Goods, Shop, GoodsParams, getRecommend } from "network/detail.js"
  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailImageInfo,
      DetailParamInfo,
      DetailCommentInfo,
      Scroll,
      GoodsList,
      DetailBottomBar,
      BackTop
    },
    mixins: [itemListenerMixin],
    data() {
      return {
        lid: null, //路由传参
        topImages: [], //轮播图
        goods: {},    // 商品信息 
        shop: {}, //店铺信息 
        shopInfo: {}, //店铺的展示
        paramsInfo: {},//参数详情
        commentInfo: {},//评论的数据,
        recommends: [],//推荐数据
        itemImgListener: null,//保存函数
        themeTopYs: [0],//位置的存储器
        getThemeTopY: null,
        currentIndex: 0,
        isShowBackTop:false
      }
    },
    created() {
      //1.商品列表数据 
      this._getDetail()
      //2.商品推荐
      this._getRecommend();
      // 3.给getThemeTopY赋值
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = [];
        // this.themeTopYs.splice(0, this.themeTopYs.length);
        const param = this.$refs.param.$el.offsetTop;
        const comment = this.$refs.comment.$el.offsetTop;
        const goodsList = this.$refs.goodsList.$el.offsetTop;
        this.themeTopYs.push(0, param, comment, goodsList, Number.MAX_VALUE);
        // console.log(this.themeTopYs);
        // this.themeTopYs.push(param);
        // this.themeTopYs.push(comment);
        // this.themeTopYs.push(goodsList);
      })
    },
    methods: {
      addTopCart(){
            //1.获取购物车需要展示的信息
            const product = {}; 
            product.image = this.topImages[0];
            product.title = this.goods.title;
            product.desc = this.goods.desc;
            product.price = this.goods.lowNowPrice;
            product.iid = this.lid; 
            // console.log(product);
            //2.将商品添加到购物车里
            // this.$store.commit("addList",product);
            this.$store.dispatch("addList",product);
      },
      backClick(){
        this.$refs.scroll.scrollTo(0, 0);
      },
      contentScroll(position) {
        //回到最顶部
        this.isShowBackTop = (-position.y) > 1000;
        // console.log(position.y);
        //1.获取y值
        const positionY = -position.y;
        //2.positionY和主题中值进行对比  
        // this.positionY = position.y;
        let length = this.themeTopYs.length;
        for (let i = 0; i < length; i++) {
          // if (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) {
          // }
          //1.联动效果实现 (普通的写法)
          // if (this.currentIndex !== i &&
          //  (i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) ||
          //  (i === length - 1 && positionY >= this.themeTopYs[i])) {
          //   this.currentIndex = i;
          //   // console.log(this.currentIndex);
          //   this.$refs.nav.currentIndex = this.currentIndex;
          // }
          //2.hack 写法
          //2.1 如果当前计数器不等于 i 则进入下一个判断条件  
          //2.2 并且滚动条大于等于指定的位置 
          //2.3 并且滚动条小于下一个位置则执行i+1 
          if (this.currentIndex !== i &&
            (positionY >= this.themeTopYs[i] &&
              positionY < this.themeTopYs[i + 1])) {
            this.currentIndex = i;
            // console.log(this.currentIndex);
            this.$refs.nav.currentIndex = this.currentIndex;
          }
        }
      },
      titleClick(i) {
        // this.themeTopYs.splice(0, this.themeTopYs.length);
        // const param = this.$refs.param.$el.offsetTop;
        // const comment = this.$refs.comment.$el.offsetTop;
        // const goodsList = this.$refs.goodsList.$el.offsetTop;
        // this.themeTopYs.push(0, param, comment, goodsList);
        // console.log(this.themeTopYs);
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[i], 200);
      },
      //商品推荐网络请求
      _getRecommend() {
        getRecommend().then(res => {
          const data = res.data.data;
          this.recommends = data.list;
          // console.log(this.recommends);
        })
      },
      //解决滚轮到底卡顿问题
      pullingUp() {
        // this.$refs.scroll.finishPullUp();
        // console.log("傻孩子到顶了");
        //到底重新计算高度
        this.$refs.scroll.refresh();
      },
      //商品列表
      _getDetail() {
        this.lid = this.$route.params.lid;
        getDetail(this.lid).then(res => {
          const data = res.data.result;
          //1.获取轮播图数据
          this.topImages = data.itemInfo.topImages;
          //2.获取商品信息  
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
          //3.获取店铺的信息 
          this.shop = new Shop(data.shopInfo);
          //4.店铺的展示  
          this.shopInfo = data.detailInfo;
          //5.获取参数的信息
          this.paramsInfo = new GoodsParams(data.itemParams.info, data.itemParams.rule)
          //6.获取评论的信息 
          // console.log(data.rate);
          if (data.rate.cRate !== 0) {
            this.commentInfo = data.rate.list[0];
          }
          //等待数据渲染在把位置push进记录器里面
          // this.$nextTick(() => {
          //2.值不对的原因:图片没有计算在内
          //根据最新的数据,对应的DOM是已经被渲染出来 
          // 但是图片依然是没有加载完(目前获取到offsetTop不包含其中的图片)
          //offsetTop值不对的时候,都是因为图片的问题
          //   this.themeTopYs = [];
          //   const param = this.$refs.param.$el.offsetTop;
          //   const comment = this.$refs.comment.$el.offsetTop;
          //   const goodsList = this.$refs.goodsList.$el.offsetTop;
          //   this.themeTopYs.push(0, param, comment, goodsList);
          // })
        })
      },
      imageLoad() {
        //  console.log(1111);
        // this.$refs.scroll.refresh();
        this.getThemeTopY();
      }
    },
    destroyed() {
      this.$bus.$off("itemImageLoad", this.itemImgListener)
    },
    mounted() {
      this.pullingUp();
      //被安排到mixins 混入里面 了  
      //   let refresh = debounce(this.$refs.scroll.refresh, 50);
      //   this.itemImgListener = () => {
      //     refresh();
      //   }
      //   this.$bus.$on("itemImageLoad", this.itemImgListener);
    },

  }
</script>
<style scoped>
  #detail {
    position: relative;
    z-index: 9999;
    background: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background: #fff;
  }

  .content {
    height: calc(100% - 44px - 49px);
  }

  [v-cloak] {
    display: none;
  }
</style>