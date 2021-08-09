import React, { useState, useEffect, useRef } from 'react'
import { Modal, Input, Form, message } from 'antd'
import PubSub from 'pubsub-js'

// 发送请求
import { createRole } from '../../../api/role'

export default function CreateRoleName(props) {
  const { showRoles, showRole } = props

  const [isModalVisible, setIsModalVisible] = useState(showRole)

  useEffect(() => {
    setIsModalVisible(showRole)
  }, [showRole])

  const formRef = useRef()

  //  点击确定
  const handleOk = async () => {
    setIsModalVisible(showRoles(false))

    try {
      // 触发表单验证 验证通过 发送请求
      const roleNameObj = await formRef.current.validateFields()
      // 发送请求
      await createRole(roleNameObj)
      // 重新加载 table 因为是兄弟组件 用消息发布阅
      PubSub.publish('createRole')

      // 	设置表单的值 发送完了值设为空
      formRef.current.setFieldsValue({
        name: '',
      })
    } catch (error) {
      // 走这里来了 就提示用户
      message.error('抱歉没有输入角色名称')
    }
  }

  // 点击取消
  const handleCancel = () => {
    setIsModalVisible(showRoles(false))
  }

  return (
    <div>
      <Modal
        title="创建角色"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form ref={formRef}>
          <Form.Item
            wrapperCol={{
              span: 18,
            }}
            name="name"
            label="角色名称"
            rules={[
              { required: true, message: '请输入角色名称' },
              {
                whitespace: true,
                type: 'string',
                message: '请输入角色名称',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
