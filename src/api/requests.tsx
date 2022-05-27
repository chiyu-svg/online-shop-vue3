/**
 * axios 二次封装
 */
import axios from 'axios'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'


const requests = axios.create({
    // 再每个请求头前填加 '/api' 请求前缀
    baseURL: '/api',
    // 当请求超过 5s 时, 停止请求
    timeout: 5000
})

// 配置请求拦截器
requests.interceptors.request.use(config => {
    Nprogress.start();
    return config
})

// 配置响应拦截器
requests.interceptors.response.use(res => {
    Nprogress.done();
    return res.data;    
}, error => {
    return Promise.reject(new Error(error))
});

export default requests;
