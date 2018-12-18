/**
 * Created by Administrator on 2018/4/18.
 */
import fetch from '@/utils/fetch'
const agents = '/Agents'
export function getAuthentication(payload) {
  return fetch({
    url: `${agents}/audit/audit_agents_list`,
    method: 'post',
    data: payload
  })
}

export function submitAuthStatus(payload) {
  return fetch({
    url: `${agents}/audit/operation_audit_agents`,
    method: 'post',
    data: payload
  })
}

export function getOrders(payload) {
  return fetch({
    url: `${agents}/audit/deal_list`,
    method: 'post',
    data: payload
  })
}

export function submitOrder(payload) {
  return fetch({
    url: `${agents}/audit/solve_deal`,
    method: 'post',
    data: payload
  })
}
