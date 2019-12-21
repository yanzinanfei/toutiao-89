// 对axios进行一个封装
import axios from 'axios'
// 请求拦截
// axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 赋值黑马头条的默认地址
axios.interceptors.request.use(function (config) {
  // 执行请求Ok
  // config 是axios的所有配置
  let token = window.localStorage.getItem('user-token') // 获取token('user-token')
  config.headers.Authorization = `Bearer ${token}` // 统一注入token
  return config // 返回的config 就会作为新的请求选项去请求
}, function () {
  // 执行请求失败
  // return Promise.reject(error)
})
export default axios
