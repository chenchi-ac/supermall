import axios from 'axios'

export function request(config) {
    // 1、创建axios实例  创建的这个本身就是一个Promise
    const instance = axios.create({
            // baseURL: 'http://123.207.32.32:8000',
            baseURL: 'http://123.207.32.32:8000/api/h3',
            // baseURL: 'http://106.54.54:8000/api/h3',
            timeout: 5000
        })
        // 2、axios拦截器 实例拦截
        // 2.1、请求拦截
    instance.interceptors.request.use(config => {
            return config
        }, err => {

        })
        // 2.2响应拦截
    instance.interceptors.response.use(res => {
        return res.data
            // 返回data就可以了
    }, err => {
        console.log(err);
    })

    // 3、发送真正网络请求 
    return instance(config)
}