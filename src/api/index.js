import fetch from '@/utils/fetch'

const agents = '/Agents'

export function getHomeTemporary() {
  return fetch({
    url: `${agents}/index/home_temporary`,
    method: 'post'
  })
}

export function getHomeAgents(id, name, page, token) {
  return fetch({
    url: `${agents}/index/home_agents`,
    method: 'post',
    data: {
      category_id: id ? id : 'all',
      commodity_name: name ? name : 'none',
      page: page,
    }
  })
}
