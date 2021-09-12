<template>
  <swiper>
    <swiper-item v-for="(item,i) of banners" :key="i">
      <a :href="item.link">
        <img width="375.1" height="195.1" v-lazy="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>
<script>
  import { Swiper, SwiperItem } from 'components/common/swiper/index.js'

  export default {
    name: 'HomeSwiper',
    components: {
      Swiper,
      SwiperItem
    },
    data() {
      return {
        isLoad: false
      }
    },
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      imageLoad() {
        if (!this.isLoad) {
          this.$emit("swiperItemLoad")
          this.isLoad = true;
        }
      }
    }
  }
</script>
<style scoped>

</style>