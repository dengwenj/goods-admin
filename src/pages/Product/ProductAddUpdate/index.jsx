import React, { Component } from 'react'
import { Card, Form, Input, Button, Cascader, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'

// 网路请求
import { getCategoryList } from '../../../api/category'
import { addProduct, updateProduct } from '../../../api/products'
import UpdateImage from './UpdateImage'
import RichTextEditor from './RichTextEditor'

export default class ProductAddUpdate extends Component {
  state = {
    options: [],
    loading: false,
  }

  componentDidMount() {
    this._getCategoryList()
  }

  // 发送请求
  _getCategoryList = async () => {
    const res = await getCategoryList('0')
    const list = res.data.data
    // 把这个返回回来的数组 变成一个新数组 用 map 方法
    const options = list.map((item) => ({
      value: item.id,
      label: item.name,
      isLeaf: false,
    }))
    // 更新状态  把这个新数组用于展示
    this.setState({
      options,
    })
  }

  // 点击提交
  onFinish = async (values) => {
    this.setState({
      loading: false,
    })
    const categoryId = values.categoryIds[0]
    const pcategoryId = values.categoryIds[1]
    delete values.categoryIds
    const text = this.textRef.getText()
    values.detail = text
    values.categoryId = categoryId
    values.pcategoryId = pcategoryId
    values.status = 1
    // 发送请求
    const Addupdate = this.props.location.state
    // 修改
    if (Addupdate) {
      await updateProduct(Addupdate.id, values)
      this.RedirectLoadingMsg()
      return
    }
    // 添加
    await addProduct(values)
    this.RedirectLoadingMsg()
  }

  // 封装了下
  RedirectLoadingMsg = () => {
    this.props.history.replace('/product')
    this.setState({
      loading: false,
    })
    message.success(this.props.location.state ? '修改成功' : '添加成功')
  }

  // 点击 options
  onChange = async (_, selectedOptions) => {}

  // 当选择某个列表项，加载下一级列表的监听回调
  loadData = async (selectedOptions) => {
    // 得到选择的 options 对象
    const targetOption = selectedOptions[0]
    targetOption.loading = true

    // 发送请求获取二级分类
    const res1 = await getCategoryList(targetOption.value)
    const optionsChildren = res1.data.data
    targetOption.loading = false
    // 遍历成新数组
    const optionsChildrenList = optionsChildren.map((item) => ({
      label: item.name,
      value: item.id,
      isLeaf: true,
    }))
    targetOption.children = optionsChildrenList
    this.setState({
      options: [...this.state.options],
    })
  }

  render() {
    const data = this.props.location.state || {}
    const title = (
      <div
        style={{ cursor: 'pointer' }}
        onClick={() => this.props.history.goBack()}
      >
        <ArrowLeftOutlined style={{ color: '#4b9eb4' }} />
        <span style={{ marginLeft: 10 }}>
          {data.id ? '修改商品' : '添加商品'}
        </span>
      </div>
    )
    const layout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 },
    }

    return (
      <div>
        <Card title={title}>
          <Form
            {...layout}
            name="nest-messages"
            onFinish={this.onFinish}
            ref={(c) => (c = this.formRef = c)}
          >
            <Form.Item
              initialValue={data.name}
              name="name"
              label="商品名称"
              rules={[
                { required: true, message: '请输入名称' },
                {
                  whitespace: true,
                  type: 'string',
                  message: '请输入名称',
                },
              ]}
            >
              <Input placeholder="请输入商品名称" />
            </Form.Item>
            <Form.Item
              initialValue={data.desc}
              name="desc"
              label="商品描述"
              rules={[
                { required: true, message: '请输入描述' },
                {
                  whitespace: true,
                  type: 'string',
                  message: '请输入描述',
                },
              ]}
            >
              <Input.TextArea placeholder="请输入商品描述" />
            </Form.Item>
            <Form.Item
              initialValue={data.price}
              name="price"
              label="商品价格"
              rules={[
                { required: true, message: '请输入价格' },
                {
                  validator(_, value) {
                    if (value > 0) return Promise.resolve()
                    return Promise.reject(new Error('价格必须大于0'))
                  },
                },
              ]}
            >
              <Input type="number" addonAfter="元" />
            </Form.Item>
            <Form.Item
              initialValue={data.id ? [data.categoryId, data.pcategoryId] : ''}
              name="categoryIds"
              label="商品分类"
              rules={[
                { required: true, message: '请选择分类' },
                {
                  validator(_, value) {
                    if (value) return Promise.resolve()
                    return Promise.reject(new Error('请选择分类'))
                  },
                },
              ]}
            >
              <Cascader options={this.state.options} loadData={this.loadData} />
            </Form.Item>
            <Form.Item label="商品图片" name="images">
              <UpdateImage />
            </Form.Item>
            <Form.Item
              label="商品详情"
              name="detail"
              labelCol={{ span: 2 }}
              wrapperCol={{ span: 18 }}
            >
              <RichTextEditor
                ref={(c) => (this.textRef = c)}
                detail={data.detail}
              />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 2 }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={this.state.loading}
              >
                提交
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
}
