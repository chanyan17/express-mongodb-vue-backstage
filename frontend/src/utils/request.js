import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'
import { getToken } from '@/utils/token'
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
  baseURL: baseUrl, // api 的 base_url
  timeout: serviceTimeout, // 请求超时时间
  withCredentials: true // 跨域
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

    if (getToken()) {
      config.headers['X-Token'] = getToken()
    }

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
      let _Message = Message({
        message: res[retMsgKey],
        type: 'error',
        duration: 2 * 1000
      })
      _Message.onClose = () => {
        res[redirectURLKey] && (location.href = res[redirectURLKey])
        router.push('/login')
      }
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
    let errorMsgMap = {
      504: '服务器错误'
    }
    let _Message
    if (!_Message) {
      _Message = Message({
        message: errorMsgMap[error.response.status],
        type: 'error',
        duration: 2 * 1000
      })
      _Message.onClose = () => {
        router.push('/login')
      }
      return Promise.reject(error.response.data)
    }
  }
)
export default service