//封装axios
import axios from 'axios'

//配置基准路径
axios.defaults.baseURL="http://localhost:3000"
localStorage.setItem("toutiao_back",axios.defaults.baseURL)

//如果我们想在请求之前做点什么，用拦截器再好不过了

//config 相当于当前的请求报文
//添加请求拦截器  为每次请求添加请求头

axios.interceptors.request.use(function (config) {
    // console.log(config);
    //请求的时候判断是否有token，如果有则添加请求的设置，否则不处理
    let token = localStorage.getItem('toutiao_back_token')
    if (token) {
        config.headers.Authorization = token
    }
    return config
}, function (error) {
    return Promise.reject(error)
})


export default axios