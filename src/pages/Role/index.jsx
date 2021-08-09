import React, { Component } from 'react'
import { Card, Button } from 'antd'

import RoleTable from './RoleTable'
import CreateRoleName from './CreateRoleName'
import SettingRoleAuth from './SettingRoleAuth'

export default class Role extends Component {
  state = { disabled: true, showRole: false, settingRoleAuth: false }

  settingRole = (disabled) => {
    this.setState({ disabled })
  }

  // 创建角色
  createRoleByName = () => {
    this.setState({ showRole: true })
  }

  // 子传过来的 显示创建角色对话框
  showRoles = (showRole) => {
    this.setState({ showRole })
  }

  // 点击设置角色权限
  settingRoleAuthClick = () => {
    // 更新状态
    this.setState({ settingRoleAuth: true })
  }

  // 子传过来的 显示设置角色权限对话框
  showSetting = (settingRoleAuth) => {
    this.setState({ settingRoleAuth })
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
        <Button
          type="primary"
          disabled={this.state.disabled}
          onClick={this.settingRoleAuthClick}
        >
          设置角色权限
        </Button>
      </div>
    )
    return (
      <div>
        <Card title={title}>
          <RoleTable settingRole={this.settingRole} />
        </Card>

        {/* 创建角色 */}
        <CreateRoleName showRoles={this.showRoles} {...this.state} />
        {/* 创建角色 */}

        {/* 设置角色权限 */}
        <SettingRoleAuth
          settingRoleAuth={this.state.settingRoleAuth}
          showSetting={this.showSetting}
        />
        {/* 设置角色权限 */}
      </div>
    )
  }
}
