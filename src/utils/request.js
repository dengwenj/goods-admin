// 引入 axios
import axios from 'axios'

const request = axios.create({
  baseURL: 'http://159.75.128.32:5000/api',
})

export default request
