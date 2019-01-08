import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import {
  baseUrl,
  serviceTimeout,
  retStatusCodeKey,
  retDataKey,
  retMsgKey,
  redirectURLKey,
  successStatusCodeValue,
  redirectStatusCodeValue
} from '@/config/api'

// 创建axios实例
const service = axios.create({
  baseURL: baseUrl || process.env.BASE_API, // api 的 base_url
  timeout: serviceTimeout // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (!config.isHideLoading) {
      store.commit('SHOW_LOADING', {
        loadingText: '努力加载数据中...',
        loadingSpinner: '',
        loadingBackground: 'rgba(0, 0, 0, 0.8)'
      })
    }

    // if (getToken()) {
    //   config.headers['X-Token'] = getToken()
    // }

    return config
  },
  error => {
    store.commit('HIDE_LOADING')
    Promise.reject(error)
  }
)

// response拦截器
service.interceptors.response.use(
  response => {
    store.commit('HIDE_LOADING')
    const res = response[retDataKey]
    if (res[retStatusCodeKey] === successStatusCodeValue) {
      return res[retDataKey]
    } else if (res[retStatusCodeKey] === redirectStatusCodeValue) {
      location.href = res[redirectURLKey]
    } else {
      Message({
        message: res[retMsgKey],
        type: 'error',
        duration: 2 * 1000
      })
      return Promise.reject(res[retMsgKey])
    }
  },
  error => {
    store.commit('HIDE_LOADING')
    Message({
      message: error.message,
      type: 'error',
      duration: 2 * 1000
    })
    return Promise.reject(error)
  }
)
export default service