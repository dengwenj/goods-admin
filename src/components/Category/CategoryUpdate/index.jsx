import React, { useState, useEffect } from 'react'
import { Modal, Form, Input } from 'antd'

export default function CategoryUpdate(props) {
  const { update, updateXG } = props

  // 函数式组件里面没有自己的 this  所有不要写 this
  // 这个是更新状态的   useState(初始值)  第一个返回值是当前的状态  第二个返回值是 更新状态值的函数 是一个函数
  // 第二个返回值的参数是非函数值，直接指定新的状态，内部用其覆盖原来的状态值
  // 第二个返回值的参数是函数值，接收原本的状态值，返回新的状态值，内部用其覆盖原来的状态值
  // setIsModalVisible(传递非函数)
  // setIsModalVisible((value)=>{}) value为原来的值
  const [isModalVisible, setIsModalVisible] = useState(update)

  useEffect(() => {
    // 更新的时候
    setIsModalVisible(update)
  }, [update])

  const handleOk = () => {
    // 更新 子传父
    setIsModalVisible(updateXG(false))
  }

  const handleCancel = () => {
    // 更新 子传父
    setIsModalVisible(updateXG(false))
  }

  return (
    <Modal
      title="更新分类"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form>
        <Form.Item>
          <Input placeholder="请输入分类名称" />
        </Form.Item>
      </Form>
    </Modal>
  )
}
