// 设置头部标题的同步 action
import { SET_HEADER_TITLE } from '../constant'

export const setHeaderTitle = (headerTile) => ({
  type: SET_HEADER_TITLE,
  data: headerTile,
})
