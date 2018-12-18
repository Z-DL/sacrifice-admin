/**
 * Created by Administrator on 2018/4/18.
 */
import fetch from '@/utils/fetch'
const agents = '/Agents'
export function getScore() {
  return fetch({
    url: `${agents}/order/check_assess`,
    method: 'post'
  })
}

//订单列表
export function orderList(proName,orderId,state='all', page) {
  return fetch({
    url: '/Agents/order/check_order',
    method: 'post',
    data: {
      commodity_name: proName || 'none',
      order_id: orderId || 'none',
      state: state,
      page: page
    }
  })
}

//订单详情
export function getOrderDetail(id) {
  return fetch({
    url: 'Agents/order/order_details',
    method: 'post',
    data: {
      order_id: id
    }
  })
}

