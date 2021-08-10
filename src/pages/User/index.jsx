import React, { PureComponent } from 'react'
import { Card, Button } from 'antd'

import CreateUser from './CreateUser'

import UserTable from './UserTable'

export default class User extends PureComponent {
  state = {
    isShowCreateUser: false,
  }

  // 点击创建用户
  createUser = () => {
    this.setState({ isShowCreateUser: true })
  }

  // 子传父 用户显示和隐藏对话框
  showHideModal = (bool) => {
    this.setState({ isShowCreateUser: bool })
  }

  render() {
    const title = (
      <Button type="primary" onClick={this.createUser}>
        创建用户
      </Button>
    )
    return (
      <div>
        <Card title={title}>
          <UserTable />
        </Card>

        {/* 创建用户 */}
        <CreateUser {...this.state} showHideModal={this.showHideModal} />
        {/* 创建用户 */}
      </div>
    )
  }
}
