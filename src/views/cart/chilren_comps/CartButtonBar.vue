<template>
    <div class="car-bar">
        <div class="check-content" @click="checkClick">
            <check-button :is-checked="isSelectAll" class="check-button"></check-button>
            <span>全选</span>
        </div>
        <div class="price">合计:{{totalPrice}}</div>
        <div class="calclate" @click="calcClick">去计算({{checkLength}})</div>
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
            },
            isSelectAll() {
                //1.使用filter
                // return !(this.carList.filter(item=> !item.checked).length);
                //如果没有数据则返回一false
                if (this.carList.length === 0) return false
                //如果有一个没有选中的则不勾选
                //2.使用find
                // return !this.carList.find(item => !item.checked)
                //3.普通遍历 
                for (let item of this.carList) {
                    if (!item.checked) {
                        return false
                    }
                }
                return true
            }
        },
        methods: {
            checkClick() {
                console.log(this.isSelectAll);
                //1.普通运算
                //如果是全选是true点击就改为选中就改为false
                /*   if (this.isSelectAll) { //全部选中
                      this.carList.forEach(item => item.checked = false);
                  }else{
                      //如果是全选是false点击就改为选中就改为true
                      this.carList.forEach(item => item.checked = true);
                  } */
                // 2.三目运算
                this.isSelectAll ? this.carList.forEach(item => item.checked = false)
                    : this.carList.forEach(item => item.checked = true)

                // 3.取反判断 不行
                // this.carList.forEach(item => item.checked= !this.isSelectAll)
            },
            calcClick() {
                if (!this.isSelectAll) {
                    this.$toast.show("请选择购买商品", 1500);
                }
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
        color: rgb(214, 219, 230);
        background: crimson;
        text-align: center;
    }
</style>