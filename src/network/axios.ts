import { message } from "antd"
import axios from "axios"
const AxiosInstance =  axios.create({
    // 基础的url
    // baseURL: "http://124.220.201.171:9205",
    // baseURL: "http://101.35.56.56:9205/",
    baseURL: "https://www.icemoon28.com:9205",
    // 超时配置
    timeout: 30000,
    headers: {
    },
    data: {
        token: sessionStorage.getItem('token')
    }
})

// 添加请求拦截器
AxiosInstance.interceptors.request.use(config => {
    const token=sessionStorage.getItem('token')
    if(token) 
    {
        config!.headers!.Authorization=token
        config.headers!.token = token
        config.params = {"token": token, ...config.params, "test2": [], "test1": {}}
    }

    return config
})
// 添加响应拦截器
AxiosInstance.interceptors.response.use(response => {
    return response.data
}, error => {
    const msg = error.Message !== undefined ? error.Message : '似乎产生了网络错误'
    if(error.response.status === 401) {
        message.error("你没有该操作的权限", 3)
        return Promise.reject(error)
    }
    if(error.response.status === 400) {
        message.error("网络请求内容出错", 3)
        return Promise.reject(error)
    }
    message.error(msg, 3)
    return Promise.reject(error)
})

export default AxiosInstance