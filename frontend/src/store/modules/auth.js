import { getAuthList, getParentAuth, createAuth, deleteAuth, getDetail, saveEditAuth, getAllAuth } from '@/api/auth'
const auth = {
  state: {
    authList: [],
    authTotalCount: 0,
    parentAuths: [],
    parentAuthMap: {}
  },
  mutations: {
    SET_AUTH_LIST (state, result) {
      state.authList = result.rows
      state.authTotalCount = result.totalCount
    },
    SET_PARENT_AUTH (state, result) {
      result.unshift({id: 0, name: '无'})
      state.parentAuths = result

      for (let i = 0; i < state.parentAuths.length; i++) {
        state.parentAuthMap[state.parentAuths[i].id] = state.parentAuths[i].name
      }
    }
  },
  actions: {
    getAuthList ({commit}, params) {
      return new Promise((resolve, reject) => {
        getAuthList(params).then(response => {
          commit('SET_AUTH_LIST', response)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getAllAuth ({commit}, params) {
      return new Promise((resolve, reject) => {
        getAllAuth(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getParentAuth ({commit}) {
      return new Promise((resolve, reject) => {
        getParentAuth().then(response => {
          commit('SET_PARENT_AUTH', response)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    createAuth ({commit}, params) {
      return new Promise((resolve, reject) => {
        createAuth(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    deleteAuth ({commit}, params) {
      return new Promise((resolve, reject) => {
        deleteAuth(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getDetail ({commit}, params) {
      return new Promise((resolve, reject) => {
        getDetail(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    saveEditAuth ({commit}, params) {
      return new Promise((resolve, reject) => {
        saveEditAuth(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default auth