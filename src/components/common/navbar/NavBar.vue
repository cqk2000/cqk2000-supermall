<template>
    <div class="nav-bar">
            <div class="left"><slot name="left"></slot></div>
            <div class="center"><slot name="center"></slot></div>
            <div class="right"><slot name="right"></slot></div>
    </div>
</template>

<script>
export default{
    name : 'NavBar'
}
</script>
<style scoped>
    .nav-bar{
          display: flex;
          line-height:44px;
          height: 44px;
          /* border:1px solid red; */
          /* background: rebeccapurple; */
          text-align: center;
          box-shadow:0 1px 1px rgba(100,100,100,.1);
    }
    .left{
         width:60px;
         /* background: rebeccapurple; */

    }
    .center{
         flex: 1;
         /* background: red; */
    }
    .right{
         width:60px;
         /* background: yellow; */
    }
</style>
