import React from 'react'
import ReactDOM from 'react-dom'
// 用于 可以不用自己一个一个的给容器组件传 store 了
import { Provider } from 'react-redux'
import store from './redux/store'
import App from './App'

// 将 App 组件标签渲染到 index 页面的 div上
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
