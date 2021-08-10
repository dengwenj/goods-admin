import request from '../utils/request'

// 用户登录
export const userLogin = (data) => {
  return request({
    method: 'POST',
    url: 'user/login',
    data,
  })
}

// 获取所有用户
export const getUserAll = () => {
  return request({
    method: 'GET',
    url: 'user/getUsers',
  })
}

// 删除用户
export const deleteUserById = (id) => {
  return request({
    url: `user/delete/${id}`,
    method: 'DELETE',
  })
}

// 创建用户
export const addUser = (data) => {
  return request({
    method: 'POST',
    url: 'user/add',
    data,
  })
}
