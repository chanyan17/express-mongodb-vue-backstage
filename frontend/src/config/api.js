// 使用模拟数据
export const isSimulateData = true

// 请求的路径(proxyTable已经进行代理，dev就不需要设置)
export const baseUrl = process.env.NODE_ENV === 'production' ? process.env.BASE_API : ''

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