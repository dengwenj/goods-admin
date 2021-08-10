import React, { useState, useEffect, useRef } from 'react'
import { Modal, Form, Input, Select, message } from 'antd'
import PubSub from 'pubsub-js'

// 网络请求
import { addUser, updateUser } from '../../../api/user'
import { getRoles } from '../../../api/role'

const { Option } = Select

export default function CreateUser(props) {
  const { isShowCreateUser, showHideModal, itemUser } = props
  console.log(itemUser)

  const [isModalVisible, setIsModalVisible] = useState(isShowCreateUser)
  const [roles, setRoles] = useState([])

  useEffect(() => {
    setIsModalVisible(isShowCreateUser)
  }, [isShowCreateUser]) // 在 isShowCreateUser 更改时更新

  useEffect(() => {
    _getRoles()
  }, [])

  useEffect(() => {
    if (!itemUser.name) {
      if (formRef.current) {
        formRef.current.setFieldsValue({
          name: '',
          phone: '',
          email: '',
          roleId: '',
        })
      }
      return
    }
    if (formRef.current) {
      formRef.current.setFieldsValue({
        name: itemUser.name,
        phone: itemUser.phone,
        email: itemUser.email,
        roleId: itemUser.roleId,
      })
    }
  })

  // 获取所有角色
  const _getRoles = async () => {
    const res = await getRoles()
    setRoles(res.data.data)
  }

  // 点击确定
  const handleOk = async () => {
    // 表单验证 验证通过发送请求
    try {
      const formItemNameAllObj = await formRef.current.validateFields()
      console.log(formItemNameAllObj)
      // 要判断发送什么请求时创建的请求还是更新的请求
      // 就判断 itemUser 对象是不是空的 是空的就是创建用户，不是空的就是修改用户
      if (itemUser.name) {
        // 不是空的就是修改用户
        await updateUser(itemUser.id, formItemNameAllObj)
        hidePubSubMsg()
        return
      }
      // 发送请求 是空的就是创建用户
      await addUser(formItemNameAllObj)
      hidePubSubMsg()
    } catch (error) {
      // 提示用户错误
      message.warning('按照规矩创建哦~')
    }
  }

  const hidePubSubMsg = () => {
    // 关闭对话框
    setIsModalVisible(showHideModal(false))
    // 消息发布与订阅 更新 table
    PubSub.publish('addUser')
    // 提示用户创建成功
    message.success('创建成功')
  }

  // 点击取消
  const handleCancel = () => {
    setIsModalVisible(showHideModal(false))
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
          // 注意 initialValues 不能被 setState 动态更新，你需要用 setFieldsValue 来更新。
          initialValue={itemUser.name}
          name="name"
          label="用户名"
          rules={[
            { required: true, message: '请输入用户名' },
            { whitespace: true, message: '用户名不能为空' },
          ]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>
        {itemUser.name ? (
          ''
        ) : (
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
        )}

        <Form.Item
          initialValue={itemUser.phone}
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
          initialValue={itemUser.email}
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
          initialValue={itemUser.roleId}
          name="roleId"
          label="角色"
          rules={[{ required: true, message: '请选择角色Id' }]}
        >
          <Select placeholder="请选择角色Id">
            {roles.map((item) => {
              return <Option key={item.id}>{item.id}</Option>
            })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}
