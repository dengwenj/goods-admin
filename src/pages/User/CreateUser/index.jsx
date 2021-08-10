import React, { useState, useEffect, useRef } from 'react'
import { Modal, Form, Input, Select } from 'antd'

const { Option } = Select

export default function CreateUser(props) {
  const { isShowCreateUser, showHideModal } = props

  const [isModalVisible, setIsModalVisible] = useState(isShowCreateUser)

  useEffect(() => {
    setIsModalVisible(isShowCreateUser)
  }, [isShowCreateUser]) // 在 isShowCreateUser 更改时更新

  // 点击确定
  const handleOk = async () => {
    // 表单验证 验证通过发送请求
    try {
      const res = await formRef.current.validateFields()
      console.log(res)
      // setIsModalVisible(showHideModal(false))
    } catch (error) {
      console.log(error)
    }
  }

  // 点击取消
  const handleCancel = () => {
    setIsModalVisible(showHideModal(false))
  }

  const handleChange = (value) => {
    console.log(`selected ${value}`)
  }

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  }

  const formRef = useRef()

  return (
    <Modal
      title="创建用户"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form {...layout} ref={formRef}>
        <Form.Item
          name="name"
          label="用户名"
          rules={[
            { required: true, message: '请输入用户名' },
            { whitespace: true, message: '用户名不能为空' },
          ]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          rules={[
            { required: true, message: '请输入密码' },
            {
              pattern: /^[0-9a-zA-Z]{6,20}$/,
              message: '密码格式输入有误',
            },
          ]}
        >
          <Input type="password" placeholder="请输入密码" />
        </Form.Item>
        <Form.Item
          name="phone"
          label="手机号"
          rules={[
            { required: true, message: '请输入手机号' },
            {
              pattern: /^1[3456789]\d{9}$/,
              message: '手机号格式输入有误',
            },
          ]}
        >
          <Input placeholder="请输入手机号" />
        </Form.Item>
        <Form.Item
          name="email"
          label="邮箱"
          rules={[
            { required: true, message: '请输入邮箱' },
            {
              pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
              message: '邮箱格式输入有误',
            },
          ]}
        >
          <Input placeholder="请输入邮箱" type="email" />
        </Form.Item>
        <Form.Item
          name="roleId"
          label="角色"
          rules={[{ required: true, message: '请选择角色' }]}
        >
          <Select onChange={handleChange} placeholder="请选择角色">
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}
