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
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
        >
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            首页
          </Menu.Item>
          <SubMenu key="sub1" icon={<MailOutlined />} title="商品">
            <Menu.Item key="5">品类管理</Menu.Item>
            <Menu.Item key="6">商品管理</Menu.Item>
          </SubMenu>
          <Menu.Item key="3" icon={<PieChartOutlined />}>
            用户管理
          </Menu.Item>
          <Menu.Item key="2" icon={<PieChartOutlined />}>
            角色管理
          </Menu.Item>
          <SubMenu key="sub2" icon={<AppstoreOutlined />} title="图形图表">
            <Menu.Item key="9">柱形图</Menu.Item>
            <Menu.Item key="10">折线图</Menu.Item>
            <Menu.Item key="100">饼图</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    )
  }
}
