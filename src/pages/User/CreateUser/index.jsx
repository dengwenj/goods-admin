import React, { useState, useEffect } from 'react'
import { Modal } from 'antd'

export default function CreateUser(props) {
  const { isShowCreateUser, showHideModal } = props
  console.log(isShowCreateUser)

  const [isModalVisible, setIsModalVisible] = useState(isShowCreateUser)

  useEffect(() => {
    setIsModalVisible(isShowCreateUser)
  }, [isShowCreateUser]) // 在 isShowCreateUser 更改时更新

  // 点击确定
  const handleOk = () => {
    setIsModalVisible(showHideModal(false))
  }

  // 点击取消
  const handleCancel = () => {
    setIsModalVisible(showHideModal(false))
  }

  return (
    <div>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      ></Modal>
    </div>
  )
}
