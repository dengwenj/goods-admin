import React, { Component } from 'react'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import logo from '../../assets/logo192.png'
import './index.less'

// const { Item } = Form.Item 下面也可以这样写  这个必须要写在 import 下面

export default class Login extends Component {
  onFinish = (values) => {
    console.log(values)
  }

  render() {
    return (
      <div className="login">
        <header className="login_header">
          <img src={logo} alt="" />
          <h1>React项目：后台管理系统</h1>
        </header>
        <section className="login_content">
          <h3>用户登录</h3>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, whitespace: true, message: '请输入用户名' },
                {
                  type: 'string',
                  min: 2,
                  max: 20,
                  message: '字符在2到20之间',
                },
                {
                  // 正则验证 pattern
                  pattern: /^[a-zA-Z0-9_]+$/,
                  message: '用户名必须是英文或数字或下划线',
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="用户名"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: '请输入密码' },
                {
                  type: 'string',
                  min: 3,
                  max: 20,
                  message: '密码必须大于3位小于12位',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}
