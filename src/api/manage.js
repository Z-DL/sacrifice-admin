import fetch from '@/utils/fetch'

const agents = '/Agents'

export function getCommercialTenant(data) {
  return fetch({
    url: `${agents}/management/agents_list`,
    method: 'post',
    data: {
      province: data.province,
      page: data.page,
    }
  })
}
export function getProvince() {
  return fetch({
    url: `${agents}/management/province`,
    method: 'get',
  })
}
export function deleteP(data) {
  return fetch({
    url: `${agents}/management/disable_agents`,
    method: 'post',
    data: {
      store_id: data.store_id,
    }
  })
}
export function commodityCategoryList(data) {
  return fetch({
    url: `${agents}/management/commodity_category_list`,
    method: 'post',
  })
}
export function addCommodityCategory(data) {
  return fetch({
    url: `${agents}/management/add_commodity_category`,
    method: 'post',
    data: {
      category_name: data.category_name,
    }
  })
}
export function deleteCommodityCategory(data) {
  return fetch({
    url: `${agents}/management/delete_commodity_category`,
    method: 'post',
    data: {
      category_id: data.category_id,
    }
  })
}
// news
export function getNewsList(page) {
  return fetch({
    url: `${agents}/detail/news_list`,
    method: 'post',
    data: {
        page: page
    }
  })
}

export function setNewsTop(id) {
  return fetch({
    url: `${agents}/detail/placed_at_the_top`,
    method: 'post',
    data: {
      news_id: id
    }
  })
}
// publish news
export function saveHandle(news_title,news_img_url,type,news_content) {
    return fetch({
        url:`${agents}/detail/save_news`,
        method: 'post',
        data:{
            news_title,
            news_img_url,
            type,
            news_content
        }
    })
}

// getComplaints
export function getComplaints(complaints_type, page) {
  return fetch({
    url: `${agents}/management/complaints_list`,
    method: 'post',
    data: {
      complaints_type: complaints_type,
      page: page
    }
  })
}
export function saveReply(id, result) {
  return fetch({
    url: `${agents}/management/solve_complaints`,
    method: 'post',
    data: {
      complaints_id: id,
      solve_result: result
    }
  })
}
