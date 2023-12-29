// 公共请求文件
import http from './index'

export default function upLoadFile(file) {
    return http.post(`/oos/upload`, file)
}
