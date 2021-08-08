import request from '../utils/request'

// 获取角色
export const getRoles = () => {
  return request({
    method: 'GET',
    url: 'role/getRoles',
  })
}
