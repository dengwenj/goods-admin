import React, { Component } from 'react'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
// 引入 react-router-dom
import { Redirect } from 'react-router-dom'
// 引入 react-redux
import { connect } from 'react-redux'
import { user } from '../../redux/actions/user'
// 本地存储
import { setItem, getItem } from '../../utils/storage'
// 网络请求
import { userLogin } from '../../api/user'
import logo from '../../assets/logo192.png'
import './index.less'
// const { Item } = Form.Item 下面也可以这样写  这个必须要写在 import 下面

// UI 组件
class LoginUI extends Component {
  // 状态
  state = {
    loading: false,
    text: '登录',
  }

  // 挂载完毕调用的钩子
  componentDidMount() {
    // 交到 redux 中
    this.props.user(getItem('user') || {})
    console.log(this)
  }

  // 提交表单且数据验证成功后回调事件
  onFinish = async (values) => {
    // 点击登录的时候 loading 为 true
    this.setState({
      loading: true,
      text: '登录中',
    })

    // 到这里来说明验证都通过了  发送请求
    const res = await userLogin(values)
    console.log(res.data.data)
    // 把这个值存到 本地存储中  这里本地存储 仅仅是为了数据持久化
    const { data } = res.data
    setItem('user', data)
    // 交到 redux 中
    this.props.user(getItem('user'))

    // 判断用户输入的用户名和密码正确没 正确了跳转首页
    if (res.data.flag) {
      // 路由组件在 props有三个重要属性
      // 用 replace 不需要在回退回来
      this.props.history.replace('/')
      message.success('登录成功')
      return
    }
    // 走到这里来了说明用户名或密码错误
    message.error('用户名或密码错误')
    this.setState({
      loading: false,
      text: '登录',
    })
  }

  // 提交表单且数据验证失败后回调事件
  onFinishFailed = ({ values, errorFields, outOfDate }) => {
    message.warning('请输入用户名和密码')
  }

  render() {
    const { loading, text } = this.state
    const { user_key } = this.props

    // 如果在 render 里面跳转用 Redirect
    // 如果有这个就不再登录了 就直接 跳转到 首页  没有这个的话才在登录页 相当于路由拦截器
    if (user_key && user_key.id) {
      return <Redirect to="/" />
    }

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
            onFinishFailed={this.onFinishFailed}
          >
            <Form.Item
              name="name"
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
                loading={loading}
              >
                {text}
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}

// 创建容器组件
// 这个第一个参数要穿两个函数  但是 第二个参数有个简写的方法 可以写成对象
// 第一个参数是 保存的状态 这个 state 就是 总的状态  他们两个的返回值就保存到 ui 组件的 props 了 返回必须是对象
// 第二个参数是 操作状态的方法 dispathch
const Login = connect((state) => ({ user_key: state.user_key }), { user })(
  LoginUI
)

export default Login
