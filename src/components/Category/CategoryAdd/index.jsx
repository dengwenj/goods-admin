import React, { useState, useEffect } from 'react'
import { Modal } from 'antd'

export default function CategoryAdd(props) {
  const { add, addF } = props

  // 函数式组件里面没有自己的 this  所有不要写 this
  // 这个是更新状态的   useState(初始值)  第一个返回值是当前的状态  第二个返回值是 更新状态值的函数 是一个函数
  // 第二个返回值的参数是非函数值，直接指定新的状态，内部用其覆盖原来的状态值
  // 第二个返回值的参数是函数值，接收原本的状态值，返回新的状态值，内部用其覆盖原来的状态值
  // setIsModalVisible(传递非函数)
  // setIsModalVisible((value)=>{}) value为原来的值
  const [isModalVisible, setIsModalVisible] = useState(add)
  useEffect(() => {
    setIsModalVisible(add)
  }, [add])
  // setIsModalVisible(add)

  const handleOk = () => {
    // addF(false) 子传父
    setIsModalVisible(addF(false))
  }

  const handleCancel = () => {
    // addF(false) 子传父 在父组件里面修改
    setIsModalVisible(addF(false))
  }
  return (
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
  )
}
