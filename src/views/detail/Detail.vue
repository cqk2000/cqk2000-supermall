<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-image-info :images-info="shopInfo" @imageLoad="imageLoad"></detail-image-info>
      <detail-param-info :paramInfo="paramsInfo"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo"></detail-comment-info>
    </scroll>
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

  import Scroll from 'components/common/bscroll/BScroll.vue'
  //Detail 商品详情网络请求
  import { getDetail, Goods, Shop, GoodsParams } from "network/detail.js"
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
      Scroll
    },
    data() {
      return {
        lid: null, //路由传参
        topImages: [], //轮播图
        goods: {},    // 商品信息 
        shop: {}, //店铺信息 
        shopInfo: {}, //店铺的展示
        paramsInfo: {},//参数详情
        commentInfo:{}
      }
    },
    created() {
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
        console.log(data.rate);
        if(data.rate.cRate !==0){
           this.commentInfo = data.rate.list[0];
        }
      })
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh();
        //  console.log(1111);
      }
    },
    destroyed() {
      // console.log("我被销毁");
    }
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
    height: calc(100% - 44px);
  }
</style>