import { debounce } from "common/utils.js"

export const itemListenerMixin = {
  mounted() {
    let refresh = debounce(this.$refs.scroll.refresh, 50);
    this.itemImgListener = () => {
      refresh();
    }
    this.$bus.$on("itemImageLoad", this.itemImgListener);
    // console.log("我是混入中的内容");
  },
}

