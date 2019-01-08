import { createRole } from '@/api/role'
const role = {
  state: {

  },
  mutations: {

  },
  actions: {
    createRole ({commit}, params) {
      return new Promise((resolve, reject) => {
        createRole(params).then((response) => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default role