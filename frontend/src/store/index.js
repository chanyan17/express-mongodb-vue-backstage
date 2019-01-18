import vue from 'vue'
import vuex from 'vuex'
import getters from '@/store/getters'

vue.use(vuex)

const requireFilter = require.context(
  // 指令目录
  '@/store/modules',
  // 不查找子目录
  false,
  // js文件
  /.+\.js$/
)

var modules = {}
// 对每个配匹的文件
requireFilter.keys().forEach(fileName => {
  // 请求指令模块
  const filterConfig = requireFilter(fileName)

  // 获取组件的 PascalCase 命名
  const filterName = fileName
    // 移除开始的 './'
    .replace(/^\.\//, '')
    // 移除文件扩展
    .replace(/\.\w+$/, '')

  modules[filterName] = filterConfig.default || filterConfig
})

const store = new vuex.Store({
  modules: modules,
  getters: getters
})

export default store
