import { getInitData } from '@/api/init'
const init = {
  state: {
    sexes: [],
    authTypes: [],
    displayModes: [],
    status: [],
    sexMap: {},
    authTypeMap: {},
    displayModeMap: {},
    statusMap: {}
  },
  mutations: {
    SET_INIT_DATA (state, initData) {
      const { sexes, authTypes, displayModes, status } = initData
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