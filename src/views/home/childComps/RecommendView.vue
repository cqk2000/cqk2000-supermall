<template>
      <div class="recommend">
            <div class="recommend-item" v-for="item in recommeds">
                  <a :href="item.link">
                     <img v-lazy="item.image" alt="">
                     <div>{{item.title}}</div>
                  </a>
            </div>
      </div>
</template>

<script>
  export default {
    name: 'RecommendView',
    props: {
      recommeds: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>
<style scoped>
   .recommend {
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 12px;
    padding: 15px 0 15px;
    border-bottom: 8px solid #eee;
  }

  .recommend-item {
    flex: 1;
  }
  .recommend-item img {
    width: 68px;
    height: 68px;
    margin-bottom: 10px;
  }
</style>