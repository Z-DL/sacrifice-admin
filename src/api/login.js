import fetch from '@/utils/fetch'

export function login(username, password, roles) {
  return fetch({
    url: '/AdminHome/login',
    // url: '/user/login',
    method: 'post',
    data: {
      console_account: username,
      console_password: password,
      state: roles
    }
  })
}

// export function getInfo(token) {
//   console.log('user info')
//   return fetch({
//     url: '/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

export function logout() {
  return fetch({
    url: '/AdminHome/logout',
    method: 'get'
  })
}
