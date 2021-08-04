import { USER_KEY } from '../constant'

// 初始化
const initState = {}

export default function userReducer(preState = initState, action) {
  const { type, data } = action

  switch (type) {
    case USER_KEY:
      return data

    default:
      return preState
  }
}
