import React, { Component } from 'react'
import { Card, Form, Input, Button, Cascader } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    isLeaf: false,
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    isLeaf: false,
  },
]

export default class ProductAddUpdate extends Component {
  state = {
    options,
  }

  // 点击提交
  onFinish = (values) => {
    console.log(values)
  }

  onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions)
  }

  loadData = (selectedOptions) => {
    const targetOption = selectedOptions[0]
    targetOption.loading = true

    // load options lazily
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
