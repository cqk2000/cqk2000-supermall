<template>
  <!-- 判断对象是否为空  -->
  <!-- 渲染找不到对象的下标所以需要判断对象是否为空 -->
  <div class="base-info" v-if="Object.keys(goods).length!==0">
    <!-- 1.title标题 -->
    <div class="info-title">{{goods.title}}</div>
    <!-- 2.商品价格 -->
    <div class="info-price">
      <!-- 2.1 优惠价格 -->
      <span class="n-price">{{goods.newPrice}}</span>
      <!-- 2.2 原价 -->
      <span class="o-price">{{goods.oldPrice}}</span>
      <!-- 2.3 优惠的图标 -->
      <!-- 2.3.1 动态传递样式 -->
      <!-- 2.3.2 判断是否有图标,如果没有则删除 -->
      <span class="discount" :style="{backgroundColor:goods.discountBgColor}"
        v-if="goods.discount">{{goods.discount}}</span>
    </div>
    <!-- 3.商品的销售数据 -->
    <div class="info-other">
      <!-- 3.1.商品的销量 -->
      <span>{{goods.columns[0]}}</span>
      <!-- 3.2.商品的收藏 -->
      <span>{{goods.columns[1]}}</span>
      <!-- 3.3.商品的发货时间 -->
      <!-- 3.3.商品的发货时间 -->
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <!-- 4.发货描述 -->
    <div class="info-service">
      <span class="info-service-item" v-for="index in goods.services.length - 1" v-if="goods.services[index-1].icon">
        <img :src="goods.services[index-1].icon" alt="">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      goods: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    mounted() {
      console.log(this.goods);
    }
  }
</script>
<style scoped>
  .base-info {
    width: 100%;
    margin-top: 15px;
    padding: 0 10px;
    color: #999999;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-title {
    text-align: justify;
    color: #222222;
  }

  .info-price {
    margin-top: 10px;
  }

  .info-price .n-price {
    font-size: 24px;
    color: #ff5777;
  }

  .info-price .o-price {
    font-size: 13px;
    margin-left: 5px;
    text-decoration: line-through;
  }

  .info-price .discount {
    font-size: 12px;
    position: relative;
    top: -4px;
    margin-left: 5px;
    padding: 3px 6px;
    color: #ffffff;
    border-radius: 8px;
    background-color: #ff5777;
  }

  .info-other {
    font-size: 13px;
    line-height: 30px;
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  }

  .info-service {
    line-height: 60px;
    display: flex;
    justify-content: space-between;
  }

  .info-service-item img {
    position: relative;
    top: 2px;
    width: 14px;
    height: 14px;
  }

  .info-service-item span {
    font-size: 13px;
    margin-left: 5px;
    color: #333333;
  }
</style>