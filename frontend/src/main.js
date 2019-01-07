// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import VueI18n from 'vue-i18n'
import LangEn from '@/lang/en'
import LangCn from '@/lang/cn'

// 引入element-ui
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 样式重置
import 'normalize.css/normalize.css'
import '@/styles/tool.css'
import '@/styles/iconfont/iconfont.css'

// 全局注册
import '@/utils/golbalRegister'

// svg
import '@/icons/index'

import App from '@/App'
import router from '@/router'

// import vuex
import store from '@/store'

Vue.use(VueI18n)
Vue.use(elementUI, {size: 'mini'})
Vue.config.productionTip = false

const i18n = {
  locale: 'cn',
  messages: {
    cn: LangCn,
    en: LangEn
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  components: { App },
  template: '<App/>'
})
