import request from '../utils/request'

// 获取角色
export const getRoles = () => {
  return request({
    method: 'GET',
    url: 'role/getRoles',
  })
}

// 创建角色 角色的名字
export const createRoleByName = (data) => {
  return request({
    url: 'role/createRoleByName',
    method: 'POST',
    data,
  })
}

// 更新角色
export const updateRole = (id, data) => {
  return request({
    url: `role/updateRole/${id}`,
    method: 'PUT',
    data,
  })
}
