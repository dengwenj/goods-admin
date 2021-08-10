// 初始值
const title = '首页'
// 用来管理头部标题的 reducer 函数
export default function headerTitle(state = title, action) {
  const { type, data } = action
  switch (type) {
    default:
      return state
  }
}
