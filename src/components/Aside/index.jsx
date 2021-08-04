import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import menuList from '../../config/menuConfig'
import './index.less'
import logo from '../../assets/logo192.png'
const { SubMenu } = Menu

export default class Aside extends Component {
  // 这里用了动态生成
  // 用到了 map()和递归调用
  getMenuNodes = (menuList) => {
    return menuList.map((item) => {
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
    return (
      <div className="aside">
        <Link to="/" className="link">
          <img src={logo} alt="" />
          <h1>后台管理</h1>
        </Link>

        <Menu
          defaultSelectedKeys={['1']}
          // defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
        >
          {this.getMenuNodes(menuList)}
        </Menu>
      </div>
    )
  }
}
