import axios from 'axios'
import { Message, MessageBox } from 'element-ui'

// 创建axios实例
const http = axios.create({
  // baseURL: 'http://192.168.1.10:3000', // 测试build使用
  baseURL: process.env.BASE_API, // api的base_url
  withCredentials: true,
  timeout: 5000 // 请求超时时间
})

// 请求拦截
http.interceptors.request.use(config => {
  // Do something before request is sent
  return config
}, error => {
  // Do something with request error
  console.warn(error) // for debug
  Promise.reject(error)
})

// 响应拦截
http.interceptors.response.use(
  response => {
    if (!response.data.success) {
      Message({
        message: response.data.errMsg || 'Unknown Error',
        type: 'error',
        duration: 5 * 1000
      })
    }
    return response.data
  },
  error => {
    if (error.response.status === 401) { // 需要验证
      MessageBox.confirm('登陆失效，可以取消继续留在该页面，或者重新登录', '登陆失效',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // TODO
        })
    } else if (error.response.status === 403) { // 资源禁止访问
      Message({
        message: '403 禁止访问',
        type: 'warn',
        duration: 5 * 1000
      })
    } else if (error.response.status === 404) { // 没有找到资源
      Message({
        message: '404 未找到资源',
        type: 'warn',
        duration: 5 * 1000
      })
    } else if (error.response.status === 500) { // 服务器错误
      Message({
        message: '500 服务器内部错误',
        type: 'warn',
        duration: 5 * 1000
      })
    } else {
      console.err('err' + error)// for debug
      Message({
        message: error,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  })

export default http
