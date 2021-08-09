import React, { useState, useEffect } from 'react'
import { Modal, Input, Form } from 'antd'
import PubSub from 'pubsub-js'

function SettingRoleAuth(props) {
  const { settingRoleAuth, showSetting } = props

  const [isModalVisible, setIsModalVisible] = useState(settingRoleAuth)
  const [valueName, setValueName] = useState('')

  useEffect(() => {
    // 这里相当于 组件更新的钩子
    setIsModalVisible(settingRoleAuth)
  }, [settingRoleAuth])

  // 使用useEffect()时，有一点需要注意。如果有多个副效应，应该调用多个useEffect()，而不应该合并写在一起
  useEffect(() => {
    // 这个 PubSub.subscribe 他的第二个参数，接收两个参数，第一个参数是名字，第二个参数才是他传过来的数据！！！
    PubSub.subscribe('roleName', (_, item) => {
      setValueName(item[0].name)
    })
  }, [])

  const handleOk = () => {
    // 显示隐藏对话框
    setIsModalVisible(showSetting(false))
  }

  const handleCancel = () => {
    // 显示隐藏对话框
    setIsModalVisible(showSetting(false))
  }
  return (
    <div>
      <Modal
        title="设置角色权限"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form.Item label="角色名称" wrapperCol={{ span: 16 }}>
          <Input value={valueName} />
        </Form.Item>
      </Modal>
    </div>
  )
}

export default SettingRoleAuth
