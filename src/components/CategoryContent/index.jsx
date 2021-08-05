import React, { Component } from 'react'
import { Table } from 'antd'
import LinkButton from '../LinkButton'

export default class CategoryContent extends Component {
  render() {
    const { categorys } = this.props

    const columns = [
      { title: '分类名称', dataIndex: 'name', key: 'name' },

      {
        title: '操作',
        width: 350,
        dataIndex: 'x',
        key: 'x',
        render: () => (
          <span>
            <LinkButton style={{ marginRight: '15px' }}>修改分类</LinkButton>
            <LinkButton>查看子分类</LinkButton>
          </span>
        ),
      },
    ]
    return (
      <div>
        <Table rowKey="1" columns={columns} />
        <Table rowKey="1" columns={columns} />
        <Table rowKey="1" columns={columns} />
        <Table rowKey="1" columns={columns} />
        <Table rowKey="1" columns={columns} />
      </div>
    )
  }
}
