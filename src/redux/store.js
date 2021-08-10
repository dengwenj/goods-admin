// 创建 store 对象 createStore是一个函数返回的是 store 对象
import { createStore, applyMiddleware } from 'redux'
// redux 开发工具
import { composeWithDevTools } from 'redux-devtools-extension'
// 异步用的
import thunk from 'redux-thunk'
// 接收总状态
import allReducer from './reducers'

// composeWithDevTools() 里面写的异步
const store = createStore(
  allReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
