// 引入 axios
import axios from 'axios'

const request = axios.create({
  baseURL: 'http://159.75.128.32:5000/api',
})

// 请求拦截器
request.interceptors.request.use(
  function (config) {
    // console.log(config)
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default request
