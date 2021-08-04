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
  render() {
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
