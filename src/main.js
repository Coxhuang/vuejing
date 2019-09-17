// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import axios from "axios";
import moment from "moment"
import VueCookies from 'vue-cookies';
import store from "./utils/store"
import api from './api/'
import axios from "./api/";
// import {Spin, Icon } from 'iview';

// Vue.component('Spin', Spin);
// Vue.component('Icon', Icon);
Vue.use(ElementUI);
Vue.use(VueCookies)

// axios.defaults.withCredentials = true
Vue.prototype.$moment = moment
    // 挂载到原型链上
Vue.prototype.$api = axios
    // axios.defaults.headers.common['Authorization'] = "TOKEN " + window.localStorage.getItem('token');
Vue.config.productionTip = false
    //全局过滤器
Vue.filter('dateFmt', (input, formatString = "YYYY-MM-DD") => {
        return moment(input).format(formatString)
    })
    /* eslint-disable no-new */


new Vue({
    el: '#app',
    store,
    router,
    components: { App },
    template: '<App/>',

})