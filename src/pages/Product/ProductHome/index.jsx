import React, { Component } from 'react'
import { Card, Button, Input, Select } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import ProductTable from './ProductTable'
// 网络请求
import { productsList } from '../../../api/products'

const { Option } = Select

export default class ProductHome extends Component {
  state = {
    pageNum: 1, //页码
    pageSize: 5, //每页条目数
    products: [],
  }

  // 挂载完毕调用的钩子
  componentDidMount() {
    this._productsList()
  }

  _productsList = async () => {
    // 获取状态
    const { pageNum, pageSize } = this.state

    const res = await productsList({
      pageNum,
      pageSize,
    })
    const { list } = res.data
    this.setState({ products: list })
  }

  handleChange = (value) => {
    console.log(value)
  }

  render() {
    const { products } = this.state

    const title = (
      <span>
        <Select
          defaultValue="1"
          style={{ width: 120 }}
          onChange={this.handleChange}
        >
          <Option value="1">按名称搜索</Option>
          <Option value="2">按价格搜索</Option>
        </Select>
        <Input
          placeholder="关键字"
          style={{ width: '150px', margin: '0 15px' }}
        />

        <Button type="primary">搜索</Button>
      </span>
    )

    const extra = (
      <Button type="primary">
        <PlusOutlined />
        添加商品
      </Button>
    )

    return (
      <div>
        <Card title={title} extra={extra}>
          {/* table */}
          <ProductTable products={products} />
          {/* table */}
        </Card>
      </div>
    )
  }
}
