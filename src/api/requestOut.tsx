/**
 * axios 二次封装
 */
 import axios from 'axios'
 import Nprogress from 'nprogress'
 import 'nprogress/nprogress.css'
 
 
 const requestsOut = axios.create({
     // 再每个请求头前填加 '/api' 请求前缀
     baseURL: 'http://gmall-h5-api.atguigu.cn/api',
     // 当请求超过 5s 时, 停止请求
     timeout: 5000
 })
 
 // 配置请求拦截器
 requestsOut.interceptors.request.use(config => {
     Nprogress.start();
     return config
 })
 
 // 配置响应拦截器
 requestsOut.interceptors.response.use((res: any) => {
     Nprogress.done();
     if(res.data.code === 200){
         return res.data;    
     }else{
        alert('请求数据异常');
        return null;
     }
 }, error => {
     return Promise.reject(error)
 });
 
 export default requestsOut;
 