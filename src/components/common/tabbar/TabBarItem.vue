<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <!-- <div :class="{active:isActive}"> -->
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TabBarItam',
    props: {
      path: String,
      activeColor:{
            type:String,
            default:"red"
      }
    },
    data() {
      return {
        // isActive: true
      }
    },
    computed: {
      isActive() {
        ///home -> item1(/home) = true
          return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle(){
          return this.isActive ? {color:this.activeColor} : {}
      }
    },
    methods: {
      itemClick() {
        // console.log(this.path);
        this.$router.replace(this.path);
      }
    }
  }
</script>
<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    /* line-height: 49px; */
    font-size: 14px;
  }

  .tab-bar-item img {
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin-bottom: 2px;

  }

  /* .active {
    color: red;
  } */
</style>