import React, { useState, useEffect, useRef } from 'react'
import { Modal, Input, Form } from 'antd'

import { updateCategory } from '../../../api/category'

export default function CategoryUpdate(props) {
  const { update, updateXG, name, id } = props

  // 函数式组件里面没有自己的 this  所有不要写 this
  // 这个是更新状态的   useState(初始值)  第一个返回值是当前的状态  第二个返回值是 更新状态值的函数 是一个函数
  // 第二个返回值的参数是非函数值，直接指定新的状态，内部用其覆盖原来的状态值
  // 第二个返回值的参数是函数值，接收原本的状态值，返回新的状态值，内部用其覆盖原来的状态值
  // setIsModalVisible(传递非函数)
  // setIsModalVisible((value)=>{}) value为原来的值
  const [isModalVisible, setIsModalVisible] = useState(update)
  // render还没结束时一些操作会触发state改变，在这个阶段如果你再改变这个state值的话就会报这个错。尽量不要在render的时候通过点击改变state
  useEffect(() => {
    // 更新的时候
    setIsModalVisible(update)
    if (form.current) {
      form.current.setFieldsValue({
        name,
      })
    }
  }, [update, name])

  const form = useRef()

  const handleOk = async () => {
    // 更新 子传父
    setIsModalVisible(updateXG(false))

    // 点击 ok 更新分类 发送请求
    // const res = await updateCategory({ id, name: })
    // console.log(res)
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
      <Form
        ref={form}
        initialValues={{
          name,
        }}
      >
        <Form.Item name="name">
          <Input placeholder="请输入分类名称" />
        </Form.Item>
      </Form>
    </Modal>
  )
}
