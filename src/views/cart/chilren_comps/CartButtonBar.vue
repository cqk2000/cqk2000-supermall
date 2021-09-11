<template>
    <div class="car-bar">
        <div class="check-content">
            <check-button class="check-button"></check-button>
            <span>全选</span>
        </div>
        <div class="price">合计:{{totalPrice}}</div>
        <div class="calclate">去计算({{checkLength}})</div>
    </div>
</template>

<script>
    import CheckButton from "components/content/checkButton/CheckButton.vue";
    import { mapGetters } from 'vuex'
    export default {
        components: {
            CheckButton
        },
        computed: {
            ...mapGetters(["carList"]),
            totalPrice() {
                return "￥" + this.carList.filter(item => {
                    return item.checked
                }).reduce((preValue, item) => {
                    return preValue + item.price * item.count
                }, 0).toFixed(2)
            },
            checkLength() {
                return this.carList.filter(item => item.checked).length
            }
        }
    }
</script>
<style scoped>
    .car-bar {
        position: relative;
        display: flex;
        height: 40px;
        line-height: 40px;
        background: #eeee;
    }

    .check-content {
        display: flex;
        align-items: center;
        margin-left: 10px;
        width: 60px;
    }

    .check-button {
        width: 20px;
        height: 20px;
        line-height: 20px;
        margin-right: 5px;
    }

    .price {
        margin-left: 30px;
        flex: 1;
    }

    .calclate {
        width: 90px;
        color:rgb(214, 219, 230);
        background: crimson;
        text-align: center;
    }
</style>