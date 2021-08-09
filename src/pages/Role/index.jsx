import React, { Component } from 'react'
import { Card, Button } from 'antd'

import RoleTable from './RoleTable'
import CreateRoleName from './CreateRoleName'

export default class Role extends Component {
  state = { disabled: true, showRole: false }

  settingRole = (disabled) => {
    this.setState({ disabled })
  }

  // 创建角色
  createRoleByName = () => {
    this.setState({ showRole: true })
  }

  // 子传过来的 显示对话框
  showRoles = (showRole) => {
    this.setState({ showRole })
  }

  render() {
    const title = (
      <div>
        <Button
          type="primary"
          style={{ marginRight: 10 }}
          onClick={this.createRoleByName}
        >
          创建角色
        </Button>
        <Button type="primary" disabled={this.state.disabled}>
          设置角色权限
        </Button>
      </div>
    )
    return (
      <div>
        <Card title={title}>
          <RoleTable settingRole={this.settingRole} />
        </Card>
        <CreateRoleName showRoles={this.showRoles} {...this.state} />
      </div>
    )
  }
}
