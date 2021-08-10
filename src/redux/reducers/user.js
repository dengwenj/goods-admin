/* 
  用来根据老的 state 和指定的 action 生成并返回新的 state 的纯函数
*/
import { USER_KEY } from '../constant'
import { getItem } from '../../utils/storage'

// 初始化
const initState = getItem('user')

// 用来管理当前登录用户的 reducer 函数
export default function userReducer(preState = initState, action) {
  const { type, data } = action

  switch (type) {
    case USER_KEY:
      return data

    default:
      return preState
  }
}
