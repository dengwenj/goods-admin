import { SET_HEADER_TITLE } from '../constant'

// 初始值
const title = ''
// 用来管理头部标题的 reducer 函数
export default function headerTitle(state = title, action) {
  const { type, data } = action
  switch (type) {
    case SET_HEADER_TITLE:
      return data

    default:
      return state
  }
}
