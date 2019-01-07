import { Loading } from 'element-ui'

const base = {
  state: {
    loadingInstance: '',
    isCollapseMenu: false,
    language: 'cn'
  },
  mutations: {
    SHOW_LOADING (state, options) {
      if (!options) options = {}

      const defaultOptions = {
        lock: true,
        text: 'Loading',
        spinner: '',
        background: 'rgba(0, 0, 0, 0.7)'
      }

      for (const k in defaultOptions) {
        if (defaultOptions.hasOwnProperty(k)) {
          options[k] = options[k] || defaultOptions[k]
        }
      }

      // 全屏 Loading 不会创建多个实例
      options.fullscreen = true

      state.loadingInstance = Loading.service(options)
    },

    HIDE_LOADING (state) {
      state.loadingInstance && state.loadingInstance.close()
    },

    TOGGLE_COLLAPSE_MENU (state) {
      state.isCollapseMenu = !state.isCollapseMenu
    },

    TOGGLE_LANGUAGE (state) {
      state.language = state.language === 'en' ? 'cn' : 'en'
    }
  },
  actions: {}
}

export default base