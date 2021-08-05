import React, { Component } from 'react'
import { Menu, Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { getWeather } from '../../api/weather'
import { user } from '../../redux/actions/user'
import { getItem } from '../../utils/storage'
import { connect } from 'react-redux'

import './index.less'

// UI组件
class HeaderUI extends Component {
  state = { weather: {} }

  componentDidMount() {
    // 发送请求
    this._getWeather()

    // redux
    // this.props.user(getItem('user'))
  }

  _getWeather = async () => {
    // setInterval(async () => {
    const res = await getWeather()
    // 更新状态
    this.setState({ weather: res.data.lives[0] })
    // }, 1000)
  }

  menu = (
    <Menu>
      <Menu.Item key="1">
        <div>退出登录</div>
      </Menu.Item>
    </Menu>
  )

  render() {
    const { weather } = this.state
    const { name } = this.props.user_key
    return (
      <div className="header">
        <div className="header_top">
          <Dropdown overlay={this.menu}>
            <a
              href="javasrcipt:"
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              欢迎 {name} <DownOutlined />
            </a>
          </Dropdown>
        </div>
        <div className="header_bottom">
          <div className="home_title">首页</div>
          <div className="time">
            <span>{weather.city}</span>
            <span>{weather.reporttime}</span>
            <span>{weather.temperature}°C</span>
            <span>{weather.weather}</span>
          </div>
        </div>
      </div>
    )
  }
}

// 容器组件
export default connect((state) => ({ user_key: state.user_key }), { user })(
  HeaderUI
)
