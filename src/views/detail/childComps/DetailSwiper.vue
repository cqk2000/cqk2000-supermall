<template>
    <!-- 轮播图 -->
    <swiper class="detail-swiper">
      <swiper-item v-for="(item,i) in topImages" :key="i">
        <!-- <img :src="item" alt=""> -->
         <!-- 懒加载 -->
        <img v-lazy="item" alt="">
      </swiper-item>
    </swiper>
</template>

<script>
  import { Swiper, SwiperItem } from 'components/common/swiper/index.js'
  export default {
    name: "DetailSwiper",
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      topImages: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>
<style scoped>
  .detail-swiper{
    height: 300px;
    overflow: hidden;
  }
</style>