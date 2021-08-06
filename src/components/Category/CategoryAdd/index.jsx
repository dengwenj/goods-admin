import React, { useState, useEffect, useRef } from 'react'
import { Modal, Form, Input, Select } from 'antd'
import { addCategory } from '../../../api/category'

export default function CategoryAdd(props) {
  const { add, addF, categorys, parentId, name, updateSuccess } = props
  // console.log(id, parentId)
  // console.log(categorys) 一级分类的数组
  // console.log(parentId) 父分类的ID

  // 函数式组件里面没有自己的 this  所有不要写 this
  // 这个是更新状态的   useState(初始值)  第一个返回值是当前的状态  第二个返回值是 更新状态值的函数 是一个函数
  // 第二个返回值的参数是非函数值，直接指定新的状态，内部用其覆盖原来的状态值
  // 第二个返回值的参数是函数值，接收原本的状态值，返回新的状态值，内部用其覆盖原来的状态值
  // setIsModalVisible(传递非函数)
  // setIsModalVisible((value)=>{}) value为原来的值
  const [isModalVisible, setIsModalVisible] = useState(add)
  // useEffect 可以正在函数式组件里面使用生命周期
  useEffect(() => {
    setIsModalVisible(add)

    if (formRef.current) {
      formRef.current.setFieldsValue({
        select: name,
      })
    }
  }, [add, name])

  const input = useRef()
  const handleOk = async () => {
    // addF(false) 子传父
    setIsModalVisible(addF(false))

    if (formRef.current) {
      var r = formRef.current.getFieldsValue(true)
    }
    await addCategory({
      parentId,
      name: r.name,
    })
    //  重新刷新列表
    updateSuccess()
  }

  const handleCancel = () => {
    // addF(false) 子传父 在父组件里面修改
    setIsModalVisible(addF(false))
  }

  const formRef = useRef()

  return (
    <Modal
      title="添加分类"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form ref={formRef} initialValues={{ select: name ? name : '一级分类' }}>
        <Form.Item name="select">
          <Select>
            <Select.Option value="0">一级分类</Select.Option>
            {categorys.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="name">
          <Input ref={input} placeholder="请输入分类名称" />
        </Form.Item>
      </Form>
    </Modal>
  )
}
