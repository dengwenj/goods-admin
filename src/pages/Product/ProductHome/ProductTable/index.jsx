import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Table, Button, Pagination } from 'antd'

import LinkButton from '../../../../components/LinkButton'
import './index.less'

class ProductTable extends Component {
  state = { current: 1 }

  // 页码或 pageSize 改变的回调，参数是改变后的页码及每页条数
  onChange = (pageNumber, pageSize) => {
    this.setState({ current: pageNumber })
    // 子传父
    this.props.listChange(pageNumber, pageSize)
  }

  // 点击详情跳转到详情页
  headleClickDetail = (id) => {
    this.props.history.push(`/product/detail/${id}`)
  }

  render() {
    const { products, allProducts, loading, disabled } = this.props

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
            <LinkButton
              style={{ display: 'block', marginBottom: 5 }}
              onClick={() => {
                this.headleClickDetail(item.id)
              }}
            >
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
          pagination={false}
          loading={loading}
        />
        <Pagination
          style={{ marginTop: 10, textAlign: 'right' }}
          showQuickJumper // 	是否可以快速跳转至某页
          current={this.state.current}
          total={allProducts.total}
          defaultPageSize={5}
          pageSizeOptions={[5, 10, 15, 20]} //指定每页可以显示多少条
          onChange={this.onChange} // 页码或 pageSize 改变的回调，参数是改变后的页码及每页条数
          onShowSizeChange={this.onShowSizeChange}
          disabled={disabled} //禁用分页
        />
      </div>
    )
  }
}

export default withRouter(ProductTable)
