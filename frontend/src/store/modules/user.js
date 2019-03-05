import { getUserList, createUser, getUserDetail, updateUser, prohibiteUser, unusableUser, normalUser, resetPwd } from '@/api/user'
import { isSimulateData } from '@/config/api'

const user = {
  state: {
    userList: [],
    userTotalCount: 0
  },
  mutations: {
    SET_USER_LIST (state, result) {
      state.userList = result.rows
      state.userTotalCount = result.totalCount
    }
  },
  actions: {
    getUserList ({commit}, params) {
      return new Promise((resolve, reject) => {
        getUserList(params).then(response => {
          commit('SET_USER_LIST', response)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    createUser ({commit}, params) {
      return new Promise((resolve, reject) => {
        if (isSimulateData) {
          // state.userList.push({});
          resolve({
            msg: '新建成功'
          })
        } else {
          createUser(params).then(response => {
            resolve(response)
          }).catch(error => {
            reject(error)
          })
        }
      })
    },
    getUserDetail ({commit}, params) {
      return new Promise((resolve, reject) => {
        getUserDetail(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    updateUser ({commit}, params) {
      return new Promise((resolve, reject) => {
        updateUser(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    prohibiteUser ({commit}, params) {
      return new Promise((resolve, reject) => {
        prohibiteUser(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    unusableUser ({commit}, params) {
      return new Promise((resolve, reject) => {
        unusableUser(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    normalUser ({commit}, params) {
      return new Promise((resolve, reject) => {
        normalUser(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    resetPwd ({commit}, params) {
      return new Promise((resolve, reject) => {
        resetPwd(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user