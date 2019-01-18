import { getInitData } from '@/api/init'
const init = {
  state: {
    sexes: [],
    authTypes: [],
    displayModes: [],
    sexMap: {},
    authTypeMap: {},
    displayModeMap: {}
  },
  mutations: {
    SET_INIT_DATA (state, initData) {
      const { sexes, authTypes, displayModes } = initData
      state.sexes = sexes
      state.authTypes = authTypes
      state.displayModes = displayModes

      for (let i = 0; i < sexes.length; i++) {
        state.sexMap[sexes[i].id] = sexes[i].name
      }

      for (let i = 0; i < authTypes.length; i++) {
        state.authTypeMap[authTypes[i].id] = authTypes[i].name
      }

      for (let i = 0; i < displayModes.length; i++) {
        state.displayModeMap[displayModes[i].id] = displayModes[i].name
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