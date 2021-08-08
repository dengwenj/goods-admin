import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu } from 'antd'
import menuList from '../../configs/menuConfig'
import './index.less'
import logo from '../../assets/logo192.png'
const { SubMenu } = Menu

class Aside extends Component {
  // 这里用了动态生成
  // 用到了 map()和递归调用
  getMenuNodes = (menuList) => {
    const { pathname } = this.props.location

    return menuList.map((item) => {
      // 这里返回是一个数组
      if (!item.children) {
        return (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.key}>{item.title}</Link>
          </Menu.Item>
        )
      } else {
        // 查找一个与当前请求路径匹配的子 item
        const path = item.children.find(
          (item1) => pathname.indexOf(item1.key) === 0
        )

        // console.log(path)  唯一的
        // 如果有值 说明当前 item 的子列表需要打开
        // 这里不止一个子选项
        if (path) {
          this.openKey = item.key
        }

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
    // 先这里调用下面才展示的出来
    const menu = this.getMenuNodes(menuList)
    let { pathname } = this.props.location
    // 当是/product/xxx 的时候
    if (pathname.indexOf('/product') === 0) pathname = '/product'

    return (
      <div className="aside">
        <Link to="/" className="link">
          <img src={logo} alt="" />
          <h1>后台管理</h1>
        </Link>

        <Menu
          selectedKeys={[pathname]}
          defaultOpenKeys={[this.openKey]}
          mode="inline"
          theme="dark"
        >
          {menu}
        </Menu>
      </div>
    )
  }
}

// 把一般组件变为路由组件就有路由组件 props 里面就有三大属性了
export default withRouter(Aside)
