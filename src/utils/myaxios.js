//封装axios
import axios from 'axios'

//配置基准路径
axios.defaults.baseURL="http://localhost:3000"
localStorage.setItem("toutiao_back",axios.defaults.baseURL)

export default axios