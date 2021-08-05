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
  state = { categorys: [] } //一级分类列表

  // 挂载完毕调用的钩子
  componentDidMount() {
    this._getCategoryList()
    // this._addCategory()
    // this._updateCategory()
  }

  // 获取分类的列表
  _getCategoryList = async () => {
    const res = await getCategoryList(0)
    const categorys = res.data.data
    this.setState({ categorys })
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
    const { categorys } = this.state

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
          <CategoryContent categorys={categorys} />
        </Card>
      </div>
    )
  }
}
