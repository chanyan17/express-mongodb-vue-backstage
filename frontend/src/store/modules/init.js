import { getInitData } from '@/api/init'
import router from '@/router'
import asynRoutesMap from '@/router/asynRoutes'

const init = {
  state: {
    sexes: [],
    authTypes: [],
    displayModes: [],
    status: [],
    sexMap: {},
    authTypeMap: {},
    displayModeMap: {},
    statusMap: {},
    user: {},
    asynRoutes: [],
    routes: []
  },
  mutations: {
    SET_INIT_DATA (state, initData) {
      const { userInfo, routes, sexes, authTypes, displayModes, status } = initData
      state.user = userInfo
      routes.forEach(item => {
        state.asynRoutes.push(asynRoutesMap[item])
      })

      state.routes = router.options.routes.concat(state.asynRoutes)

      state.sexes = sexes
      state.authTypes = authTypes
      state.displayModes = displayModes
      state.status = status

      for (let i = 0; i < sexes.length; i++) {
        state.sexMap[sexes[i].id] = sexes[i].name
      }

      for (let i = 0; i < authTypes.length; i++) {
        state.authTypeMap[authTypes[i].id] = authTypes[i].name
      }

      for (let i = 0; i < displayModes.length; i++) {
        state.displayModeMap[displayModes[i].id] = displayModes[i].name
      }

      for (let i = 0; i < status.length; i++) {
        state.statusMap[status[i].id] = status[i].name
      }
    }
  },
  actions: {
    getInitData ({commit}) {
      return new Promise((resolve, reject) => {
        getInitData().then((response) => {
          commit('SET_INIT_DATA', response)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default init