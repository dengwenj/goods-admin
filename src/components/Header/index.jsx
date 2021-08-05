import React, { Component } from 'react'
import { Menu, Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons'

import './index.less'

export default class Header extends Component {
  menu = (
    <Menu>
      <Menu.Item key="1">
        <div>退出登录</div>
      </Menu.Item>
    </Menu>
  )

  render() {
    return (
      <div className="header">
        <div className="header_top">
          <Dropdown overlay={this.menu}>
            <a
              href="javasrcipt:"
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              欢迎 admin <DownOutlined />
            </a>
          </Dropdown>
        </div>
        <div className="header_bottom">
          <div className="home_title">首页</div>
          <div className="time">
            <span>2019-5-16</span>
            <img src="../../assets/logo192.png" alt="" />
            <span>晴</span>
          </div>
        </div>
      </div>
    )
  }
}
