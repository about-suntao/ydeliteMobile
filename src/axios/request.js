import axios from 'axios'
import config from './config'

const service = axios.create({
    // 公共接口--这里注意后面会讲
    baseURL: config.baseUrl,
    // 超时时间 单位是ms，这里设置了3s的超时时间
    timeout: 3 * 1000,
})
// 2.请求拦截器
service.interceptors.request.use(
    (config) => {
        config.headers = {
            'Content-Type':
                config.data instanceof FormData ? 'false' : 'application/json ', //配置请求头
        }
        return config
    },
    (error) => {
        Promise.reject(error)
    }
)

// 3.响应拦截器
service.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        return Promise.resolve(error.response)
    }
)
//4.导入文件
export default service
