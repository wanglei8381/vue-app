//根组件
var App = require('./app');
//路由配置
var router = require('./router');
//启动路由监听
router.start(App, 'html');


console.log('--------------------- VUE-APP 0.0.1 ---------------------');