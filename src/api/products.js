import request from '../utils/request'

// 查询商品
export const productsList = (data) => {
  return request({
    method: 'POST',
    url: 'products/list',
    data,
  })
}

// 按照描述搜索
export const searchDesc = (desc, pageNum, pageSize) => {
  return request({
    method: 'GET',
    url: `products/searchByDesc/${desc}/${pageNum}/${pageSize}`, // 不能复制 要自己写 不然报错像乱码的那种
  })
}

// 按照名字搜索
export const searchName = (params) => {
  return request({
    method: 'GET',
    url: 'products/searchByName',
    params,
  })
}
