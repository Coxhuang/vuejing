import Vuex from 'vuex';
import Vue from 'vue'
Vue.use(Vuex)
const store = new Vuex.Store({
    // 状态
    state: {
        btnsShow: true,
        userShow: false,
        username: '',
        wallet: ''
    },
    getters: {

    },
    mutations: {

    }
});
export default store