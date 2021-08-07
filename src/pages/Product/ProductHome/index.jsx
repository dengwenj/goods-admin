import React, { Component } from 'react'
import { Card, Button, Input, Select } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import ProductTable from './ProductTable'
// 网络请求
import { productsList, searchDesc, searchName } from '../../../api/products'

const { Option } = Select

export default class ProductHome extends Component {
  state = {
    pageNum: 1, //页码
    pageSize: 5, //每页条目数
    products: [], // 商品的数组
    allProducts: {}, // table的数据
    loading: false,
    disabled: false,
    optionValue: 'name', // 点击 option 切换
    inputValue: '', // 输入 input 的值
    isShowNameDescAll: 1, // 判断要哪个数据 list
  }

  // 挂载完毕调用的钩子
  componentDidMount() {
    this._productsList()
  }

  _productsList = async () => {
    this.setState({ loading: true, disabled: true })
    // 获取状态
    const { pageNum, pageSize } = this.state

    const res = await productsList({
      pageNum,
      pageSize,
    })
    // console.log(res)
    const { list } = res.data
    const allProducts = res.data
    this.setState({
      products: list,
      allProducts,
      loading: false,
      disabled: false,
    })
  }

  // 点击分页 子传过来的
  lsitChange = (pageNumber, pageSize) => {
    this.setState({ pageNum: pageNumber, pageSize }, () => {
      // setate是异步更新的 在状态更新且重新 render()后执行
      // 因为这里有什么的发送请求 所以要判断下 根据isShowNameDescAll 来判断 1 表示 没有搜索 2 表示按名字搜索或描述搜索
      const { isShowNameDescAll } = this.state
      // isShowNameDescAll 为1 表示没有搜索
      if (isShowNameDescAll === 1) return this._productsList()
      //isShowNameDescAll 为2 表示按名字搜索或描述搜索
      this.searchProduct()
    })
  }

  // 点击 option 的时候
  handleChange = (value) => {
    this.setState({
      optionValue: value,
    })
  }

  // 当输入框值变化的时候
  inputValueChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    })
  }

  // 点击搜索的时候
  searchProduct = async () => {
    this.setState({ loading: true, disabled: true })
    // 发送请求 获取数据回来 展示在 table 上
    // 判断是用 name 搜索 还是用 desc 搜索的 发送不同的请求 响应不同的结果
    const { optionValue, inputValue, pageNum, pageSize } = this.state
    if (optionValue === 'name') {
      // 这里就是按名字搜索
      const res = await searchName({
        name: inputValue,
        pageNum,
        pageSize,
      })
      const { list } = res.data
      const allProducts = res.data
      this.setState({
        products: list,
        allProducts,
        loading: false,
        disabled: false,
        isShowNameDescAll: 2,
      })
      return
    }
    // 这里是描述搜索
    const res1 = await searchDesc(inputValue, pageNum, pageSize)
    const { list } = res1.data
    const allProducts = res1.data
    this.setState({
      products: list,
      allProducts,
      loading: false,
      disabled: false,
      isShowNameDescAll: 2,
    })
  }

  render() {
    const title = (
      <span>
        <Select
          defaultValue="name"
          style={{ width: 120 }}
          onChange={this.handleChange}
        >
          <Option value="name">按名称搜索</Option>
          <Option value="desc">按描述搜索</Option>
        </Select>
        <Input
          placeholder="关键字"
          style={{ width: '150px', margin: '0 15px' }}
          onChange={this.inputValueChange}
        />
        <Button type="primary" onClick={this.searchProduct}>
          搜索
        </Button>
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
          <ProductTable {...this.state} listChange={this.lsitChange} />
          {/* table */}
        </Card>
      </div>
    )
  }
}
