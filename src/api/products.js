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

// 根据 Id 查询商品 详情
export const productsById = (id) => {
  return request({
    method: 'GET',
    url: `products/findById/${id}`,
  })
}

// 根据 Id更新商品状态（在售或未售）
export const productsByIdStatus = (id, status) => {
  return request({
    method: 'PUT',
    url: `products/updateStatus/${id}`,
    data: {
      status,
    },
  })
}

// 添加商品
export const addProduct = (data) => {
  return request({
    url: 'products/addProduct',
    method: 'POST',
    data,
  })
}

// 修改商品
export const updateProduct = (id, data) => {
  return request({
    url: `products/updateProduct/${id}`,
    method: 'PUT',
    data,
  })
}
