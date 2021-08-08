import React, { Component } from 'react'
import { Card, Form, Input, Button, Cascader } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'

// 网路请求
import { getCategoryList } from '../../../api/category'

export default class ProductAddUpdate extends Component {
  state = {
    options: [],
  }

  componentDidMount() {
    this._getCategoryList()
  }

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
  onFinish = (values) => {
    console.log(values)
  }

  onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions)
  }

  // 当选择某个列表项，加载下一级列表的监听回调
  loadData = (selectedOptions) => {
    const targetOption = selectedOptions[0]
    targetOption.loading = true

    setTimeout(() => {
      targetOption.loading = false
      targetOption.children = [
        {
          label: `${targetOption.label} Dynamic 1`,
          value: 'dynamic1',
        },
        {
          label: `${targetOption.label} Dynamic 2`,
          value: 'dynamic2',
        },
      ]
      this.setState({
        options: [...this.state.options],
      })
    }, 1000)
  }

  render() {
    const title = (
      <div
        style={{ cursor: 'pointer' }}
        onClick={() => this.props.history.goBack()}
      >
        <ArrowLeftOutlined style={{ color: '#4b9eb4' }} />
        <span style={{ marginLeft: 10 }}>添加商品</span>
      </div>
    )
    const layout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 },
    }

    return (
      <div>
        <Card title={title}>
          <Form {...layout} name="nest-messages" onFinish={this.onFinish}>
            <Form.Item
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
            <Form.Item label="商品分类">
              <Cascader
                options={this.state.options}
                loadData={this.loadData}
                onChange={this.onChange}
                changeOnSelect
              />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 2 }}>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
}
