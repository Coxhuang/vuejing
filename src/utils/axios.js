import axios from 'axios'
import router from '../router/index'
axios.defaults.baseURL = process.env.API_ROOT
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function(config) {
    let token = window.localStorage.getItem('token');
    if (token != null && token != "") {
        config.headers['Authorization'] = "TOKEN " + window.localStorage.getItem('token');
    } else {

    }
    return config
}, function(error) {　　 // 对请求错误做些什么
    return Promise.reject(error)
});
axios.interceptors.response.use(function(response) {
    return response
}, function(error) {
    // token 错误
    if (error.response.status == 401) {
        localStorage.clear()
        router.replace({
            path: '/home/login',
        })
    }
    return Promise.reject(error)
})
export default axios