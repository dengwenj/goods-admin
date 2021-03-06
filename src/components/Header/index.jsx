import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Menu, Dropdown, Modal, message } from 'antd'
import { DownOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'

import { getWeather } from '../../api/weather'
import { loginOut } from '../../redux/actions/user'
// import menuConfig from '../../configs/menuConfig'
// import { removeItem } from '../../utils/storage'
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
  // getTitle = (menuConfig) => {
  //   const { pathname } = this.props.location
  //   let title = ''
  //   menuConfig.forEach((element) => {
  //     if (element.key === pathname) {
  //       title = element.title
  //     } else if (element.children) {
  //       const cItem = element.children.find(
  //         (item) => pathname.indexOf(item.key) === 0
  //       )
  //       // 当要所有的匹配完 如果有值才说明有匹配的
  //       if (cItem) {
  //         title = cItem.title
  //       }
  //     }
  //   })
  //   return title
  // }

  // 点击退出登录
  loginOut = () => {
    confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '确定退出登录吗？',
      onOk: () => {
        // 这里要改成箭头函数 用外部的 this
        // 删除用户user 回到登录页面
        this.props.loginOut({})
        message.success('退出成功')
        // this.props.history.replace('/login')
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
    // const title = this.getTitle(menuConfig)
    const { weather } = this.state
    const { name } = this.props.userLoginData
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
          {/* this.props.headerTitle redux 存的 读数据*/}
          <div className="home_title">{this.props.headerTitle}</div>
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
// export default withRouter(
//   connect(
//     (state) => ({ user_key: state.user_key, headerTitle: state.headerTitle }),
//     { user }
//   )(HeaderUI)
// )

export default connect(
  (state) => ({
    userLoginData: state.userLoginData,
    headerTitle: state.headerTitle,
  }),
  { loginOut }
)(withRouter(HeaderUI))
