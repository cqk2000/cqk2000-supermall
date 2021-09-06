<template>
  <div class="goods">
          <goods-item  v-for="(item,i) in goods" :key="i" :goods-item="item" ></goods-item>
  </div>
</template>

<script>
  import goodsItem from './GoodstListItem.vue';
  export default {
    name: 'goodsList',
    components:{
        goodsItem
    },
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>
<style scoped>
 .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding:5px;
  }
</style>