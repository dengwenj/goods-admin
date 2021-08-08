import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Menu, Dropdown, Modal, message } from 'antd'
import { DownOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { getWeather } from '../../api/weather'
import { user } from '../../redux/actions/user'
import { connect } from 'react-redux'
import menuConfig from '../../configs/menuConfig'
import { removeItem } from '../../utils/storage'
import './index.less'

const { confirm } = Modal

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

  // 动态显示当前标题
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

  // 点击退出登录
  loginOut = () => {
    confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '确定退出登录吗？',
      onOk: () => {
        // 这里要改成箭头函数 用外部的 this
        // 删除用户user 回到登录页面
        removeItem('user')
        message.success('退出成功')
        this.props.history.replace('/login')
      },
      onCancel() {},
    })
  }

  menu = (
    <Menu>
      <Menu.Item key="1">
        <div onClick={this.loginOut}>退出登录</div>
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
          {/* <i>由 f2e.xd 基于 React 单独开发的后台管理系统</i> */}
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
            <span>{weather.temperature}°C</span>
            <span>{weather.weather}</span>
            <span>更新于：{weather.reporttime}</span>
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
