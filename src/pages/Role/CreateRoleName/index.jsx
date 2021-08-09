import React, { useState, useEffect } from 'react'
import { Modal } from 'antd'

export default function CreateRoleName(props) {
  const { showRoles, showRole } = props
  const [isModalVisible, setIsModalVisible] = useState(showRole)

  useEffect(() => {
    setIsModalVisible(showRole)
  }, [showRole])

  const handleOk = () => {
    setIsModalVisible(showRoles(false))
  }

  const handleCancel = () => {
    setIsModalVisible(showRoles(false))
  }

  return (
    <div>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  )
}
