<template>
    <div class="bottom-bar">
        <div class="bar-item bar-left">
            <div>
                <i class="icon service"></i>
                <span class="text">客服</span>
            </div>
            <div>
                <i class="icon shop"></i>
                <span class="text">店铺</span>
            </div>
            <div>
                <i class="icon select"></i>
                <span class="text">收藏</span>
            </div>
        </div>
        <div class="bar-item bar-right">
            <div class="cart" @click="addTocart">加入购物车</div>
            <div class="buy">购买</div>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            addTocart() {
             this.$emit("addCart");
            }
        }
    }
</script>
<style scoped>
    .bottom-bar {
        height: 55px;
        position: fixed;
        background-color: #fff;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        text-align: center;
    }

    .bar-item {
        flex: 1;
        display: flex;
    }

    .bar-item>div {
        flex: 1;
    }

    .bar-left .text {
        font-size: 13px;
    }

    .bar-left .icon {
        display: block;
        width: 22px;
        height: 22px;
        margin: 10px auto 3px;
        background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
    }

    .bar-left .service {
        background-position: 0 -54px;
    }

    .bar-left .shop {
        background-position: 0 -98px;
    }

    .bar-right {
        font-size: 15px;
        color: #fff;
        line-height: 58px;
    }

    .bar-right .cart {
        background-color: #9e1364;
        color: rgb(241, 234, 234);
    }

    .bar-right .buy {
        background-color: rgb(219, 37, 37);
    }

    .sport-ball {
        position: absolute;
        left: 225px;
        bottom: 20px;
    }
</style>