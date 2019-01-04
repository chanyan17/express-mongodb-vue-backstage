// 切换数据入口开关
export const isFakeData = !(process.env.NODE_ENV === 'development')

// 请求的路径,若不设置则根据环境来配置(process.env.BASE_API)
export const baseUrl = 'http://192.168.0.107:3000'

// 超时时间设置
export const serviceTimeout = 5000

// key配置
export const retStatusCodeKey = 'ok'
export const retDataKey = 'data'
export const retMsgKey = 'msg'
export const redirectURLKey = 'goto'

// 接口成功状态码
export const successStatusCodeValue = 0

// 重定向状态码
export const redirectStatusCodeValue = 98