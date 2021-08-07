import request from '../utils/request'

// 获取一级 / 二级分类的列表
export const getCategoryList = (parentId) => {
  return request({
    method: 'GET',
    url: `category/list/${parentId}`,
  })
}

// 添加分类
export const addCategory = (data) => {
  return request({
    method: 'POST',
    url: 'category/add',
    data,
  })
}

// 更新分类
export const updateCategory = (data) => {
  return request({
    method: 'PUT',
    url: 'category/update',
    data,
  })
}

// 获取一个分类
export const getCategoryOne = (id) => {
  return request({
    method: 'GET',
    url: `category/findCategoryById/${id}`,
  })
}
