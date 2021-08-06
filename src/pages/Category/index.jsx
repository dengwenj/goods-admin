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
  state = {
    categorys: [], //一级分类列表
    subCategorys: [], // 二级分类列表
    parentId: '0', // 传的父id
    parentName: '', // 父 名称
    loading: false, // loading
  }

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

    //  获取状态
    const { parentId } = this.state
    const res = await getCategoryList(parentId)
    const categorys = res.data.data
    // 判断 parentId 是为 0 还是 其他
    if (parentId === '0') return this.setState({ categorys, loading: false })
    this.setState({ subCategorys: categorys, loading: false })
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

  sub = (id, name) => {
    // 子传过来的 id
    this.setState({ parentId: id, parentName: name }, () => {
      this._getCategoryList()
    }) // 状态更新是异步的
  }

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
          <CategoryContent {...state} sub={this.sub} />
        </Card>
      </div>
    )
  }
}
