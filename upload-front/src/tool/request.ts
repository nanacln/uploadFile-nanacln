/**
 * axios 请求的公共信息进行提取
 */
// import axios  from 'axios'
import axios ,{AxiosRequestHeaders}from 'axios'
import qs from 'qs'
const instance = axios.create();
instance.defaults.baseURL = 'http://106.14.172.134:8880'

 instance.defaults.transformRequest = (data, headers) => {
     const contentType = (headers as AxiosRequestHeaders)['Content-Type']

     if (contentType === 'multipart/form-data') {
         return data
     }
     return qs.stringify(data) // 传递参数格式  
 }
// 响应拦截器
instance.interceptors.response.use(response => {
    return response.data
}, reason => {
    // 请求失败统一处理
    return Promise.reject(reason)
})
export default instance