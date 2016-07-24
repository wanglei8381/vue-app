var Vue = require('vue');
var VueRouter = require('vue-router');
// 安装路由模块
Vue.use(VueRouter);

// 创建一个路由器实例
var router = new VueRouter();

router.map({
    '/': {
        component: function (resolve) {
            require(['./views/home'], resolve);
        }
    },
    '/pullupdown': {
        component: function (resolve) {
            require(['./views/pull-to-fresh'], resolve);
        }
    },
    '*action': {
        component: function (resolve) {
            require(['./views/home'], resolve);
        }
    }
});

module.exports = router;