import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu } from 'antd'
import menuList from '../../config/menuConfig'
import './index.less'
import logo from '../../assets/logo192.png'
const { SubMenu } = Menu

class Aside extends Component {
  // 这里用了动态生成
  // 用到了 map()和递归调用
  getMenuNodes = (menuList) => {
    return menuList.map((item) => {
      // 这里返回是一个数组
      if (!item.children) {
        return (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.key}>{item.title}</Link>
          </Menu.Item>
        )
      } else {
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {/* 这里用到了递归 */}
            {this.getMenuNodes(item.children)}
          </SubMenu>
        )
      }
    })
  }

  render() {
    const { pathname } = this.props.location
    console.log(pathname)
    return (
      <div className="aside">
        <Link to="/" className="link">
          <img src={logo} alt="" />
          <h1>后台管理</h1>
        </Link>

        <Menu
          selectedKeys={[pathname]}
          // defaultOpenKeys={['/tixingtubiao']}
          mode="inline"
          theme="dark"
        >
          {this.getMenuNodes(menuList)}
        </Menu>
      </div>
    )
  }
}

// 把一般组件变为路由组件就有路由组件 props 里面就有三大属性了
export default withRouter(Aside)
