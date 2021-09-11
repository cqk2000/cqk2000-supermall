<template>
    <div class="cart">
        <!-- 1.导航 -->
        <nav-bar>
            <div slot="center">购物车({{length}})</div>
        </nav-bar>
        <!-- 2.购物车商品列表 -->
        <cart-list></cart-list>
        <!-- 3.商品总数 -->
        <cart-button-bar></cart-button-bar>
    </div>
</template>

<script>
    //导航
    import NavBar from 'components/common/navbar/NavBar.vue'
    import CartList from '../../views/cart/chilren_comps/CartList'
    import CartButtonBar from "../../views/cart/chilren_comps/CartButtonBar.vue"

    //vux结构器 
    import { mapGetters } from "vuex";
    export default {
        name: 'Cart',
        components: {
            NavBar,
            CartList,
            CartButtonBar
        },
        computed: {
            // carLength(){
            //         return this.$store.getters.carLength;
            // }
            //两种写法 数组 和对象的写法
            // ...mapGetters(["carLength","carList"])
            ...mapGetters({
                length: "carLength",
            })
        }
    }
</script>
<style scoped>
    .cart{
         height:100vh;
    }
    .nav-bar {
        background: var(--color-tint);
        color: #fff;
    }
</style>