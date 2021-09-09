import Vue from "vue";
import VueRouter from "vue-router";

//组件懒加载 
const Home = () => import('views/home/Home.vue');
const Category = () => import('views/category/Category.vue');
const Cart = () => import('views/cart/Cart.vue');
const Profile = () => import('views/profile/Profile.vue');
const Detail = () => import('views/detail/Detail.vue')

// 安装 vue-router
Vue.use(VueRouter);

//2.创建路由对象
const routes = [
    {
        path: "/",
        redirect: "/home",
        meta: {
            title: "首页"
        }
    },
    {
        path: "/home",
        component: Home,
        meta: {
            title: "首页"
        }
    },
    {
        path: "/category",
        component: Category,
        meta: {
            title: "分类"
        }
    },
    {
        path: "/cart",
        component: Cart,
        meta: {
            title: "购物车"
        }
    },
    {
        path: "/profile",
        component: Profile,
        meta: {
            title: "资料"
        }
    },
    {
        path: "/detail/:lid",
        component: Detail,
        meta: {
            title: "商品详情"
        }
    }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})
router.afterEach(from=>{
    document.title=from.meta.title;
})
export default router;  