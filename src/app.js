import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './router';

Vue.use(VueRouter)
//引入全局变量
import './global';

//引入全局组件
import './components';

// 安装路由模块
Vue.use(VueRouter);

const router = new VueRouter({
    routes
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
    router,
    el: '#app'
})


// const app = new Vue({
//     router,
//     data() {
//         return {title: 'vue-app'};
//     }
// }).$mount('#app')