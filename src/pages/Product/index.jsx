import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import ProductAddUpdate from './ProductAddUpdate'
import ProductDetail from './ProductDetail'
import ProductHome from './ProductHome'

export default class Product extends Component {
  render() {
    return (
      <div>
        <Switch>
          {/* exact  列如 精确匹配下的 ‘/’ 加后缀是匹配不到的，只能有访问 ’/‘才能跳转 */}
          <Route exact path="/product" component={ProductHome} />
          <Route path="/product/addupdate" component={ProductAddUpdate} />
          <Route path="/product/detail/:id" component={ProductDetail} />
          <Redirect to="/product" />
        </Switch>
      </div>
    )
  }
}
