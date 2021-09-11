<template>
  <div class="cart-list">
    <scroll class="content">
          <cart-list-item v-for="(item,index) in list" :key="index" :product="item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
  import { mapGetters } from "vuex"
  import Scroll from "components/common/bscroll/BScroll.vue"
  import CartListItem from "../../../views/cart/chilren_comps/CartListItem.vue"
  export default {
    name: "CartList",
    components: {
      Scroll,
      CartListItem
    },
    computed: {
      ...mapGetters({
        list: "carList"
      })
    }
  }
</script>
<style scoped>
  .cart-list {
    height: calc(100% - 44px - 49px - 40px);
  }
  .content {
    height: 100%;
    overflow: hidden;
  }
</style>