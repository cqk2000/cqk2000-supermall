import Toast from './Toast.vue'
const obj={};

obj.install = function (Vue){
    // console.log("我是install函数");
    //1.创建组件构造器 
    const toastConstrustor = Vue.extend(Toast);
    //2.new的方式,根据构造器,可以创建出来一个组件对象 
    const toast = new toastConstrustor();
    //3.将组件对象,手动挂载到某一个元素上
    toast.$mount(document.createElement("div"))
    console.log(toast.$el);
    //4.toast.$el对应的就是div
    document.body.appendChild(toast.$el);
    // console.log(document.body);
    //5.将toast的对象添加到vue原型上
    Vue.prototype.$toast =toast;
}

export default obj;