import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import toast from './components/common/toast';

//图片的懒加载  
Vue.use(VueLazyLoad,{
     //占位图
    loading:require("./assets/img/common/placeholder.png")
});

// 解决移动端300毫秒延迟
FastClick.attach(document.body);

Vue.config.productionTip = false
//定义一个事件总线  
Vue.prototype.$bus=new Vue();

//安装toast插件
Vue.use(toast);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

