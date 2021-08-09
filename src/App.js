import React, { Component, lazy, Suspense } from 'react'
// 引入路由
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Loading from './components/Loading'

import './App.less'
import './styles/base.css'
// import 'antd/dist/antd.less' 按需打包了 就不用写这个了

// 路由懒加载
const Login = lazy(() => import('./pages/Login'))
const Layout = lazy(() => import('./pages/Layout'))

export default class App extends Component {
  // 一个关于 setState 的面试题
  // 对象的 setState 会合并
  // 函数的 setSate 的 state 参数永远都是新的
  // state = { count: 1 }
  // componentDidMount() {
  //   this.setState({
  //     count: this.state.count + 1,
  //   })
  //   this.setState({
  //     count: this.state.count + 1,
  //   })
  //   this.setState((state) => {
  //     return { count: state.count + 1 }
  //   })
  //   console.log('componentDidMount', this.state.count)

  //   setTimeout(() => {
  //     this.setState({
  //       count: this.state.count + 1,
  //     })
  //     console.log('setTimeout', this.state.count)
  //   }, 0)
  // }
  render() {
    // console.log('render', this.state.count)
    return (
      <div className="app">
        <BrowserRouter>
          {/* Switch 只匹配其中一个 找到了一个就不会在往下找了 */}
          {/* Suspense 懒加载要用到的 */}
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/" component={Layout} />
            </Switch>
          </Suspense>
        </BrowserRouter>
      </div>
    )
  }
}
