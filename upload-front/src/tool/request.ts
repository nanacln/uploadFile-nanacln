/**
 * axios 请求的公共信息进行提取
 */
// import axios  from 'axios'
import axios  from 'axios'
// import qs from 'qs'
 const instance = axios.create();
 instance.defaults.baseURL = 'http://127.0.0.1:8880'

//  instance.defaults.transformRequest = (data, headers) => {
//      const contentType = (headers as AxiosRequestHeaders)['Content-Type']
     
//      if (contentType === 'application/x-www-form-urlencoded') {
//          return qs.stringify(data) // 传递参数格式
//      }
//      return data    
//  }
 // 响应拦截器
 instance.interceptors.response.use( response => {
     return response.data
 }, reason => {
     // 请求失败统一处理
     return Promise.reject(reason)
 })
 export default instance