import React, { Component } from 'react'
import { Card, Button } from 'antd'
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons'

// 网络请求
import { getCategoryList, addCategory } from '../../api/category'
import LinkButton from '../../components/LinkButton'
import CategoryContent from '../../components/Category/CategoryContent'
import CategoryAdd from '../../components/Category/CategoryAdd'
import CategoryUpdate from '../../components/Category/CategoryUpdate'

export default class Category extends Component {
  // 状态
  state = {
    categorys: [], //一级分类列表
    subCategorys: [], // 二级分类列表
    parentId: '0', // 传的父id
    parentName: '', // 父 名称
    loading: false, // loading
    add: false, // 显示 对话框 用了 函数式组件 练练手
    update: false, //显示 对话框 用了 函数式组件 练练手
    name: '',
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
      // 在状态更新且重新 render() 后执行
      this._getCategoryList()
    }) // 状态更新是异步的
  }

  // 点击这里 把parentId 变为 0 可以返回一个分类 那个一级分类还是存在状态里面的
  handleClick = () => {
    this.setState({ parentId: '0' })
  }

  // 点击了添加
  handleAdd = () => {
    this.setState({ add: true })
  }

  // 显示隐藏 子传父 添加
  addF = (add) => {
    this.setState({ add })
  }
  // 显示隐藏 子传父 更新
  update = (update) => {
    this.setState({ update })
  }

  // 点击修改 子传父
  handleUpdate = (item) => {
    this.item = item
    this.setState({ update: true })
  }

  // 更新成功重新渲染列表 子传父 子里面调用
  updateSuccess = () => {
    this._getCategoryList()
  }

  render() {
    const state = this.state

    const { name, id } = this.item || {}

    const nameId = { name, id }

    const title =
      state.parentId === '0' ? (
        '一级分类列表'
      ) : (
        <span>
          <LinkButton onClick={this.handleClick}>一级分类列表</LinkButton>
          <ArrowRightOutlined style={{ margin: '0 10px' }} />
          <span>{this.state.parentName}</span>
        </span>
      )
    const add = (
      <Button type="primary" onClick={this.handleAdd}>
        <PlusOutlined />
        添加
      </Button>
    )

    return (
      <div>
        <Card title={title} extra={add}>
          {/* 子组件  state批量传入给子组件*/}
          <CategoryContent
            {...state}
            sub={this.sub}
            handleUpdate={this.handleUpdate}
          />
        </Card>

        {/* 添加组件 */}
        <CategoryAdd add={state.add} addF={this.addF} />
        {/* 添加组件 */}

        {/* 更新组件 */}
        <CategoryUpdate
          update={state.update}
          updateXG={this.update}
          updateSuccess={this.updateSuccess}
          {...nameId}
        />
        {/* 更新组件 */}
      </div>
    )
  }
}
