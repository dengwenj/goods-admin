import React, { Component } from 'react'
// 引入路由
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './pages/Login'
import Layout from './pages/Layout'
import './App.less'
import './styles/base.css'
// import 'antd/dist/antd.less' 按需打包了 就不用写这个了

export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          {/* Switch 只匹配其中一个 */}
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/" component={Layout} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
