<template>
  <div class="tab-control">
    <div class="tab-control-item" @click="tabClick(i)" :class="{active:i === currentIndex}" v-for="(item,i) in titles"
      :key="i"><span>{{titles[i]}}</span></div>
  </div>
</template>

<script>
  export default {
    name: 'TabControl',
    props: {
      //父组件向子组件传值
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        //计数器
        currentIndex: 0
      }
    },
    methods: {
      tabClick(index) {
        //计数器等于点击的按钮下标
        this.currentIndex = index;
        //发送一个事件给对象.并且把值传递出去
        this.$emit("tabClick",index);
      }
    }
  }
</script>
<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background: #fff;
    /* transition: all 0.3s; */
  }

  .tab-control-item {
    flex: 1;
  }

  .tab-control-item span {
    padding: 5px;
  }

  .active {
    color: var(--color-high-text);
  }

  .active span {
    border-bottom: 3px solid var(--color-tint);
  }
</style>