import React, { Component } from 'react'
import { Card, Form, Input, Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'

export default class ProductAddUpdate extends Component {
  onFinish = (values) => {
    console.log(values)
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
              rules={[{ required: true, message: '请输入价格' }]}
            >
              <Input type="number" addonAfter="元" />
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
