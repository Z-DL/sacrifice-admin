/**
 * Created by Administrator on 2018/4/18.
 */
import fetch from '@/utils/fetch'
const agents = '/Agents'
export function getSellersInfo() {
  return fetch({
    url: `${agents}/information/check_agents_details`,
    method: 'post'
  })
}
export function saveSellersInfo(payload) {
  return fetch({
    url: `${agents}/information/save_agents_details`,
    method: 'post',
    data: payload
  })
}
export function getProvince() {
  return fetch({
    url: `${agents}/management/province`,
    method: 'get'
  })
}

export function getCity(province) {
  return fetch({
    url: `${agents}/management/city`,
    method: 'post',
    data: province
  })
}
export function saveAuth(payload) {
  return fetch({
    url: `${agents}/certification/save_agents_certification`,
    method: 'post',
    data: payload
  })
}
export function getAuthInstruction() {
  return fetch({
    url: `${agents}/certification/instructions`,
    method: 'get'
  })
}

export function getVerifyProgress() {
  return fetch({
    url: `${agents}/certification/certification_rate_of_progress`,
    method: 'get'
  })
}

export function resetAuth() {
  return fetch({
    url: `${agents}/certification/reset_certification`,
    method: 'post'
  })
}
