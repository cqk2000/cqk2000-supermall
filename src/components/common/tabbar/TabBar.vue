<template>
    <div id="tab-bar">
      <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'TabBar'
  }
</script>
<style scoped>
  #tab-bar {
    display: flex;
    background: #f6f6f6;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index:999;
    box-shadow: 0px -2px 1px rgba(100, 100, 100, .1);
  }

</style>