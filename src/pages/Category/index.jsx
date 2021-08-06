import React, { Component } from 'react'
import { Card, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

// 网络请求
import {
  getCategoryList,
  addCategory,
  updateCategory,
} from '../../api/category'
import CategoryContent from '../../components/CategoryContent'

export default class Category extends Component {
  // 状态
  state = { categorys: [], loading: false } //一级分类列表

  // 挂载完毕调用的钩子
  componentDidMount() {
    this._getCategoryList()
    // this._addCategory()
    // this._updateCategory()
  }

  // 获取分类的列表
  _getCategoryList = async () => {
    // 记住只要状态改变就要 render
    // loading 为 true
    this.setState({ loading: true })
    const res = await getCategoryList(0)
    const categorys = res.data.data
    this.setState({ categorys, loading: false })
  }

  // 添加分类
  // _addCategory = async () => {
  //   const res = await addCategory({ parentId: 0, categoryName: '汽车' })
  //   console.log(res)
  // }

  // 更新分类
  // _updateCategory = async () => {
  //   const res = await updateCategory({
  //     categoryName: '飞机',
  //     id: 266,
  //   })
  //   console.log(res)
  // }

  render() {
    const state = this.state

    const title = '一级分类列表'
    const add = (
      <Button type="primary">
        <PlusOutlined />
        添加
      </Button>
    )

    return (
      <div>
        <Card title={title} extra={add}>
          {/* 子组件  state批量传入给子组件*/}
          <CategoryContent {...state} />
        </Card>
      </div>
    )
  }
}
