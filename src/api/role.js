import request from '../utils/request'

// 获取角色
export const getRoles = () => {
  return request({
    method: 'GET',
    url: 'role/getRoles',
  })
}

// 创建角色 角色的名字
export const createRole = (data) => {
  return request({
    url: 'role/createRole',
    method: 'POST',
    data,
  })
}
