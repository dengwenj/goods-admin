import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Menu, Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { getWeather } from '../../api/weather'
import { user } from '../../redux/actions/user'
import { connect } from 'react-redux'
import menuConfig from '../../config/menuConfig'

import './index.less'

// UI组件
class HeaderUI extends Component {
  state = { weather: {} }

  componentDidMount() {
    // 发送请求
    this._getWeather()
  }

  _getWeather = async () => {
    // setInterval(async () => {
    const res = await getWeather()
    // 更新状态
    this.setState({ weather: res.data.lives[0] })
    // }, 1000)
  }

  getTitle = (menuConfig) => {
    const { pathname } = this.props.location
    let title = ''
    menuConfig.forEach((element) => {
      if (element.key === pathname) {
        title = element.title
      } else if (element.children) {
        const cItem = element.children.find((item) => item.key === pathname)
        // 当要所有的匹配完 如果有值才说明有匹配的
        if (cItem) {
          title = cItem.title
        }
      }
    })
    return title
  }

  getTitle

  menu = (
    <Menu>
      <Menu.Item key="1">
        <div>退出登录</div>
      </Menu.Item>
    </Menu>
  )

  render() {
    const title = this.getTitle(menuConfig)
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
          <div className="home_title">{title}</div>
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
export default withRouter(
  connect((state) => ({ user_key: state.user_key }), { user })(HeaderUI)
)
