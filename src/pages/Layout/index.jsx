import React, { Component, lazy } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { user } from '../../redux/actions/user'
import { getItem } from '../../utils/storage'
import { Layout } from 'antd'

// 路由懒加载
const Aside = lazy(() => import('../../components/Aside'))
const Header = lazy(() => import('../../components/Header'))
const Home = lazy(() => import('../../pages/Home'))
const Bar = lazy(() => import('../../pages/Bar'))
const Category = lazy(() => import('../../pages/Category'))
const Line = lazy(() => import('../../pages/Line'))
const Pie = lazy(() => import('../../pages/Pie'))
const Product = lazy(() => import('../../pages/Product'))
const Role = lazy(() => import('../../pages/Role'))
const User = lazy(() => import('../../pages/User'))

const { Footer, Sider, Content } = Layout

// UI 组件
class LayoutUI extends Component {
  // 这样写仅仅是为了学习 练习用加深对知识的印象 实际开发不会这样用
  componentDidMount() {
    this.props.user(getItem('user'))
  }

  render() {
    const userKey = getItem('user')

    // 如果要在 render 里面跳转用 Redirect
    // 如果没有 user 就不需要访问主页面，跳转到登录页 相当于路由拦截器
    // 后面的都不会走了 比如 /home /user  也是直接跳转到 /login
    if (!userKey || !userKey.id) {
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

          {/* 主体 */}
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
              {/* 当路径都没有匹配上是 就显示 /home 就是重定向 */}
              {/* 一句：就是要每次都要从一级路由这么找下来 */}
              <Redirect to="/home" />
            </Switch>
          </Content>
          {/* 主体 */}

          {/* 底部 */}
          <Footer style={{ textAlign: 'center', color: '#bbb' }}>
            由 f2e.xd 基于 React 单独开发的后台管理系统
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
