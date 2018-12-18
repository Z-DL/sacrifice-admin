import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken, setCertification, removeCertification, setRoles, removeRoles, removeSteps, setSteps } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
      console.log(typeof state.roles)
      console.log('state.roles is:'+state.roles)
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      console.log('*****login*******')
      console.log(username, userInfo.password, userInfo.roles)
      return new Promise((resolve, reject) => {
        login(username, userInfo.password, userInfo.roles).then(response => {
          const data = response.data
          //roles存放的数组，在此需要转为数组
          let role = []
          role.push(data.type)
          console.log('roles', role)
          setToken(data.token)
          setCertification(data.certification)
          commit('SET_TOKEN', data.token)
          commit('SET_ROLES', role)
          commit('SET_NAME', username)
          commit('SET_AVATAR', username)
          // window.localStorage.setItem('roles',JSON.stringify(role))
          setRoles(JSON.stringify(role))
          setSteps(data.steps)
          resolve()
        }).catch(error => {
          console.log('error')
          console.log(error)
          reject(error)
        })
      })
    },

    // 获取用户信息
    // GetInfo({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     getInfo(state.token).then(response => {
    //       const data = response.data
    //       commit('SET_ROLES', data.roles)
    //       commit('SET_NAME', data.name)
    //       commit('SET_AVATAR', data.avatar)
    //       resolve(response)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          removeCertification()
          // window.localStorage.removeItem('roles')
          removeRoles()
          removeSteps()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
