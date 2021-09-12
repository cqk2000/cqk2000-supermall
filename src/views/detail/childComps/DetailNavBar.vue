<template>
  <!-- 导航条 -->
  <nav-bar>
    <div slot="left" @click="backClick">
      <img class="back" src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="title">
      <div @click="titleClick(i)" :class="{active:i===currentIndex}" v-for="(item,i) in titles" :key="i"
        class="title-item">{{item}}</div>
    </div>
  </nav-bar>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'

  export default {
    components: {
      NavBar
    },
    data() {
      return {
        titles: ["商品", "参数", "评论", "推荐"],
        currentIndex: 0,
      }
    },
   
    methods: {
      titleClick(i) {
        this.currentIndex = i;
        //发送事件
        this.$emit("titleClick",i);
      },
      backClick(){
        //  history.back();
        // this.$router.go(-1);
        this.$router.back();
      }
    }
  }
</script>
<style scoped>
  .title {
    display: flex;
    font-size: 13px;
  }

  .title-item {
    flex: 1
  }

  .active {
    color: var(--color-tint);
  }

  .back {
    vertical-align: middle;
  }
</style>