// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

// 引入element-ui
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 样式重置
import 'normalize.css/normalize.css'
import '@/styles/tool.css'

// 全局注册
import '@/utils/golbalRegister'

// svg
import '@/icons/index'

import App from '@/App'
import router from '@/router'

// import vuex
import store from '@/store'

Vue.use(elementUI, {size: 'mini'})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
