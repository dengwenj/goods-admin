import request from '../utils/request'

// 查询商品
export const productsList = (data) => {
  return request({
    method: 'POST',
    url: 'products/list',
    data,
  })
}
