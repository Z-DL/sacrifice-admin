import fetch from '@/utils/fetch'

const agents = '/Agents'

export function getGoodType() {
  return fetch({
    url: `${agents}/items/category`,
    method: 'get'
  })
}

export function fetchSellList(id, name, page, token) {
  return fetch({
    url: `${agents}/items/sale_commodity`,
    method: 'post',
    data: {
      category_id: id ? id : 'all',
      commodity_name: name ? name : 'none',
      page: page,
    }
  })
}

export function publishGood(data) {
  return fetch({
    url: `${agents}/items/save_commodity`,
    method: 'post',
    data: Object.assign({}, data)
  })
}

export function editGood(data) {
  return fetch({
    url: `${agents}/items/edit_commodity`,
    method: 'post',
    data: Object.assign({}, data)
  })
}

export function uploadImg(fileList) {
  let list = new FormData()
  list.append('file[]', fileList)
  /*fetch({
      url: `${agents}/items/save_commodity`,
      method: 'post',
      data: list,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })*/
  return fetch.post(`${agents}/UploadFiles/upload_items_img`, list, {headers: {
    "Content-Type": "multipart/form-data"
  }})
}

export function fetchStoreList(id, name, page, token) {
  return fetch({
    url: `${agents}/items/warehouse_commodity`,
    method: 'post',
    data: {
      category_id: id ? id : 'all',
      commodity_name: name ? name : 'none',
      page: page,
      token: token,
    }
  })
}

export function deleteGoods(idList, token) {
  return fetch({
    url: `${agents}/items/delete_commodity`,
    method: 'post',
    data: {
      commodity_id: idList,
      token: token,
    }
  })
}

export function downGoods(idList, token) {
  return fetch({
    url: `${agents}/items/put_down_commodity`,
    method: 'post',
    data: {
      commodity_id: idList,
      token: token,
    }
  })
}

export function upGoods(idList, token) {
  return fetch({
    url: `${agents}/items/put_up_commodity`,
    method: 'post',
    data: {
      commodity_id: idList,
      token: token,
    }
  })
}

