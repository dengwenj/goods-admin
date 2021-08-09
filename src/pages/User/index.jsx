import React, { Component } from 'react'
import { Card, Button } from 'antd'

import UserTable from './UserTable'

export default class User extends Component {
  render() {
    const title = <Button type="primary">创建用户</Button>
    return (
      <Card title={title}>
        <UserTable />
      </Card>
    )
  }
}
