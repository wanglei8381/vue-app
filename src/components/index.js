var Vue = require('vue');
//全局组件
Vue.component('header-cpt', require('./header.vue'));
Vue.component('footer-cpt', require('./footer.vue'));


Vue.component('pullrefresh', require('vue-pullrefresh'));
Vue.component('actionsheet', require('vue-m-actionsheet'));
Vue.component('picker', require('vue-m-picker'));
Vue.component('region-picker', require('vue-m-region-picker'));