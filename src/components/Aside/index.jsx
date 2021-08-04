import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import {
  AppstoreOutlined,
  PieChartOutlined,
  MailOutlined,
} from '@ant-design/icons'
import './index.less'
import logo from '../../assets/logo192.png'
const { SubMenu } = Menu

export default class Aside extends Component {
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
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <Link to="/home">首页</Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<MailOutlined />} title="商品">
            <Menu.Item key="2">
              <Link to="/category">品类管理</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/product">商品管理</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="4" icon={<PieChartOutlined />}>
            <Link to="/user">用户管理</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<PieChartOutlined />}>
            <Link to="/role">角色管理</Link>
          </Menu.Item>
          <SubMenu key="sub2" icon={<AppstoreOutlined />} title="图形图表">
            <Menu.Item key="6">
              <Link to="bar">柱形图</Link>
            </Menu.Item>
            <Menu.Item key="7">
              <Link to="/line">折线图</Link>
            </Menu.Item>
            <Menu.Item key="8">
              <Link to="/pie">饼图</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    )
  }
}
