var Vue = require('vue');
//引入自定义指令
require('./directives');
//引入全局组件
require('./components');

module.exports = {
    data: function () {
        return {title: 'vue-app'};
    }
}