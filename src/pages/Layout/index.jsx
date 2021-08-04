import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { user } from '../../redux/actions/user'
import { getItem } from '../../utils/storage'
import { Layout } from 'antd'
import Aside from '../../components/Aside'
import Header from '../../components/Header'
import Home from '../Home'
import Bar from '../Bar'
import Category from '../Category'
import Line from '../Line'
import Pie from '../Pie'
import Product from '../Product'
import Role from '../Role'
import User from '../User'

const { Footer, Sider, Content } = Layout

// UI 组件
class LayoutUI extends Component {
  componentDidMount() {
    console.log(this)
    this.props.user(getItem('user') || {})
  }

  render() {
    const { user_key } = this.props

    // 如果要在 render 里面跳转用 Redirect
    // 如果没有 user 就不需要访问主页面，跳转到登录页 相当于路由拦截器
    if (!user_key || !user_key.id) {
      return <Redirect to="/login" />
    }

    return (
      <Layout style={{ height: '100%' }}>
        {/* 侧边栏 */}
        <Sider>
          <Aside></Aside>
        </Sider>
        {/* 侧边栏 */}

        <Layout>
          {/* 头部 */}
          <Header></Header>
          {/* 头部 */}

          {/* 主题 */}
          <Content style={{ backgroundColor: '#fff' }}>
            <Switch>
              {/* 二级路由  二级路由也要从一级路由这里下来 先要一级路由在二级路由 所有上哪里的拦截器就进不到这里 */}
              <Route path="/home" component={Home} />
              <Route path="/bar" component={Bar} />
              <Route path="/category" component={Category} />
              <Route path="/line" component={Line} />
              <Route path="/pie" component={Pie} />
              <Route path="/product" component={Product} />
              <Route path="/role" component={Role} />
              <Route path="/user" component={User} />
              <Redirect to="/home" />
            </Switch>
          </Content>
          {/* 主题 */}

          {/* 底部 */}
          <Footer style={{ textAlign: 'center', color: '#ccc' }}>
            推荐使用谷歌浏览器，可以获得更佳页面操作
          </Footer>
          {/* 底部 */}
        </Layout>
      </Layout>
    )
  }
}

// 容器组件
export default connect((state) => ({ user_key: state.user_key }), { user })(
  LayoutUI
)
