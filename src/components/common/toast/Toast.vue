<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    // props: {
    //   message: {
    //     type: String,
    //     default: ""
    //   },
    //   show: {
    //     type: Boolean,
    //     default: true
    //   }
    // }
    data() {
      return {
        message: "",
        isShow: false
      }
    },
    methods: {
      show(message="默认文字", duration=2000) {
        console.log("........");
        this.isShow = true;
        this.message = message;
        setTimeout(() => {
          this.isShow = false;
          this.message = ""
        },duration)
      }
    }
  }
</script>
<style scoped>
  .toast {
    position: fixed;
    top: 45%;
    left: 50%;
    color: white;
    padding: 5px 10px;
    z-index: 9999;
    background: rgba(0, 0, 0, .6);
    transform: translate(-50%, -50%);
  }
</style>