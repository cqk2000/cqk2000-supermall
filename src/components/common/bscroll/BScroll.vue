<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from "better-scroll"
  export default {
    name: 'BScroll',
    data() {
      return {
        scroll: null
      }
    },
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      //1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: true,
        pullUpLoad: this.pullUpLoad
      })
      //2.监听滚动的位置
      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on("scroll", (position) => {
          // console.log(position);
          this.$emit("scroll", position);
        })
      }
      //3.监听上拉事件
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp');
        })
      }
    },
    computed:{
           //封装传递
           y(){
                return this.scroll ? this.scroll.y : 0;
           }
    },
    methods: {
      //滚动的距离
      scrollTo(x, y, tiem = 300) {
        this.scroll && this.scroll.scrollTo(x, y, tiem)
      },
      //重复调用上拉加载
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      //刷新重新计算高度
      refresh() {
        this.scroll && this.scroll.refresh();
        // console.log("------");
      },
    }
  }
</script>
<style scoped>

</style>