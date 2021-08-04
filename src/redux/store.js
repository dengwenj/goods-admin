// 创建 store 对象 createStore是一个函数返回的是 store 对象
import { createStore } from 'redux'
// redux 开发工具
import { composeWithDevTools } from 'redux-devtools-extension'
// 接收总状态
import allReducer from './reducers'

// composeWithDevTools() 里面写的异步  这里没有用到异步就没写
const store = createStore(allReducer, composeWithDevTools())

export default store
