import fetch from '@/utils/fetch'

const agents = '/Agents'

export function getConnection(payload) {
  return fetch({
    url: `${agents}/detail/contact`,
    method: 'post',
    data: payload
  })
}
export function getIndex(payload) {
  return fetch({
    url: `${agents}/detail/home`,
    method: 'post',
    data: payload
  })
}
export function uploadImg(fileList, url, index) {
  let list = new FormData()
  list.append('file[]', fileList)
  list.append('sorting', index)
  /*fetch({
      url: `${agents}/items/save_commodity`,
      method: 'post',
      data: list,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })*/
  return fetch.post(`${agents}/UploadFiles/${url}`, list, {headers: {
    "Content-Type": "multipart/form-data"
  }})
}


// 加盟页
export function joinData(type='read', img, leading, profile, step) {
  return fetch({
    url: `${agents}/detail/join_us`,
    method: 'post',
    data: {
      type: type,
      join_us_img: img,
      join_us_leading: leading,
      join_us_profile: profile,
      join_us_step: step
    }
  })
}

export function getCompany (payload) {
  return fetch({
    url: `${agents}/detail/about_us`,
    method: 'post',
    data: payload
  })
}
