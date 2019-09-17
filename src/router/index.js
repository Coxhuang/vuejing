import Vue from 'vue'
import Router from 'vue-router'
// import axios from "axios";
Vue.use(Router)

const router = new Router({
    // mode: 'history',
    routes: [{
            path: '/home', //主页
            name: 'home',
            redirect: '/home/match',
            component: () => import ('../components/home'),
            children: [{
                    path: '/home/match',
                    name: 'match',
                    component: () =>
                        import ('../components/match')
                },
                {
                    path: '/home/register',
                    name: 'register',
                    component: () =>
                        import ('../components/register')
                },
                {
                    path: '/home/login',
                    name: 'login',
                    component: () =>
                        import ('../components/login')
                },
            ]
        },
        {
            path: '/',
            redirect: '/home/match',
        },
        // {
        //     path: '/home',
        //     redirect: '/home/match',
        // },
        {
            path: '/userCenter',
            name: 'userCenter',
            redirect: '/userCenter/MenberCenter',
            component: () =>
                import ('../components/userCenter'),
            children: [{
                    path: '/userCenter/MenberCenter',
                    name: 'MenberCenter',
                    component: () =>
                        import ('../components/MenberCenter')
                },
                {
                    path: '/userCenter/userData',
                    name: 'userData',
                    component: () =>
                        import ('../components/userData')
                },
                {
                    path: '/userCenter/accountSecurity',
                    name: 'accountSecurity',
                    component: () =>
                        import ('../components/accountSecurity')
                },
                {
                    path: '/userCenter/bankCard',
                    name: 'bankCard',
                    component: () =>
                        import ('../components/bankCard')
                },
                {
                    path: '/userCenter/addCard',
                    name: 'addCard',
                    component: () =>
                        import ('../components/addCard')
                },
                {
                    path: '/userCenter/accountDetails',
                    name: 'accountDetails',
                    component: () =>
                        import ('../components/accountDetails')
                },
                {
                    path: '/userCenter/gameRecord',
                    name: 'gameRecord',
                    component: () =>
                        import ('../components/gameRecord')
                },
            ]
        },
        {
            path: '/payWay',
            name: 'payWay',
            component: () =>
                import ('../components/payWay'),
        },
        {
            path: '/apply',
            name: 'apply',
            component: () =>
                import ('../components/apply'),
        },
    ]
})
import axios from "@/api";
import api from '@/api/'
Vue.prototype.$api = axios
router.beforeEach((to, from, next) => {
    let username = window.localStorage.getItem('username')
    if (to.path == '/userCenter/MenberCenter') {
        api.apitest.getPlayerMessage(username).then(response => {
            console.log(response)
            next()
        }).catch(error => {
            console.log(error.response)
            if (error.response.status != 200) {
                localStorage.removeItem('token')
                localStorage.removeItem('username')
                next('/home/login')
            } else {

            }
        })
    } else {
        next()
    }
})
export default router
