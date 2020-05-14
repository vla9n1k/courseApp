import Vue from 'vue'
import VueRouter from 'vue-router'
import Cart from './views/shop/Cart'
import Orders from './views/shop/Orders'
import Shop from './views/shop/Shop'
import AddProduct from './views/shop/AddProduct'
import UserProducts from './views/shop/UserProducts'
import SignUp from './views/auth/SignUp'
import Login from './views/auth/Login'
import AdminControl from "./views/admin/AdminControl";
Vue.use(VueRouter);

export const routes = [
    {path: '*', redirect: '/'},
    {path: '/', component: Shop},
    {path: '/cart', component: Cart},
    {path: '/products/:id', component: UserProducts},
    {path: '/orders', component: Orders},
    {path: '/product-add', component: AddProduct},
    {path: '/signup', component: SignUp},
    {path: '/login', component: Login},
    {path: '/admin', component: AdminControl},
];

export const router = new VueRouter({
    mode: 'history',
    routes
});