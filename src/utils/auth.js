import Cookies from 'js-cookie'

const TokenKey = 'token'
const certification = 'certification'
const roles = 'roles'
const steps = 'step'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function getCertification() {
  return Cookies.get(certification)
}

export function setCertification(status) {
  return Cookies.set(certification, status)
}

export function removeCertification() {
  return Cookies.remove(certification)
}
export function getSteps() {
  return Cookies.get(steps)
}

export function setSteps(status) {
  return Cookies.set(steps, status)
}

export function removeSteps() {
  return Cookies.remove(steps)
}
export function getRoles() {
  return window.localStorage.getItem(roles)
}

export function setRoles(role) {
  return window.localStorage.setItem(roles, role)
}

export function removeRoles() {
  return window.localStorage.removeItem(roles)
}
