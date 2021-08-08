import React, { Component } from 'react'
import { Card, Button } from 'antd'

import RoleTable from './RoleTable'

export default class Role extends Component {
  state = { disabled: true }
  settingRole = (disabled) => {
    this.setState({ disabled })
  }

  render() {
    const title = (
      <div>
        <Button type="primary" style={{ marginRight: 10 }}>
          创建角色
        </Button>
        <Button disabled={this.state.disabled}>设置角色权限</Button>
      </div>
    )
    return (
      <div>
        <Card title={title}>
          <RoleTable settingRole={this.settingRole} />
        </Card>
      </div>
    )
  }
}
