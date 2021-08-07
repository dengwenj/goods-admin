import React, { Component } from 'react'
import { Table, Button } from 'antd'

import LinkButton from '../../../../components/LinkButton'
import './index.less'

export default class ProductTable extends Component {
  render() {
    const { products } = this.props
    const columns = [
      { title: '商品名称', width: 150, dataIndex: 'name' },
      { title: '商品描述', dataIndex: 'desc' },
      {
        title: '价格',
        width: 120,
        dataIndex: 'price', // 当前指定了对应的属性，传入的是对应的属性值 不写这个 render的参数就是每一项
        render: (price, item, index) => `￥${price}`,
      },
      {
        title: '状态',
        dataIndex: 'status',
        width: 120,
        render: (status) => (
          <div>
            <Button type="primary">
              {status === 1 ? '下架' : status === 0 ? '上架' : '暂无消息'}
            </Button>
            <div style={{ marginTop: 5, color: '#4b9eb4' }}>
              {status === 1 ? '在售' : status === 0 ? '未售' : '暂无消息'}
            </div>
          </div>
        ),
      },
      {
        title: '操作',
        width: 150,
        // dataIndex: 'price', 不写这个 render的参数就是每一项
        render: (item) => (
          <div>
            <LinkButton style={{ display: 'block', marginBottom: 5 }}>
              详情
            </LinkButton>
            <LinkButton>修改</LinkButton>
          </div>
        ),
      },
    ]

    const product = products
    return (
      <div>
        <Table
          rowKey={(item) => item.id}
          columns={columns}
          dataSource={product}
          bordered
        />
        ,
      </div>
    )
  }
}
