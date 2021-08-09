import React, { useState, useEffect } from 'react'
import { Modal, Input, Form, Tree } from 'antd'
import PubSub from 'pubsub-js'

import menuList from '../../../configs/menuConfig'
import { updateRole } from '../../../api/role'

const treeData = menuList

export default function SettingRoleAuth(props) {
  const { settingRoleAuth, showSetting } = props

  const [isModalVisible, setIsModalVisible] = useState(settingRoleAuth)
  const [valueName, setValueName] = useState('')
  const [MenusArr, setItemMenus] = useState([])
  const [id, setId] = useState('')

  useEffect(() => {
    // 这里相当于 组件更新的钩子
    setIsModalVisible(settingRoleAuth)
  }, [settingRoleAuth])

  // 使用useEffect()时，有一点需要注意。如果有多个副效应，应该调用多个useEffect()，而不应该合并写在一起
  useEffect(() => {
    // 这个 PubSub.subscribe 他的第二个参数，接收两个参数，第一个参数是名字，第二个参数才是他传过来的数据！！！
    const unsubscribe = PubSub.subscribe('roleName', (_, item) => {
      setValueName(item[0].name)
      const menus = item[0].menus.split(',')
      setItemMenus(menus)
      const id = item[0].id
      setId(id)
    })
    return () => {
      PubSub.unsubscribe(unsubscribe)
    }
  }, [])

  const handleOk = async () => {
    // 显示隐藏对话框
    setIsModalVisible(showSetting(false))
    // 发送请求
    // const res = await updateRole(id, {
    //   authName: valueName,
    //   menus: MenusArr.join(','),
    // })
    // console.log(res)
  }

  const handleCancel = () => {
    // 显示隐藏对话框
    setIsModalVisible(showSetting(false))
  }

  // 点击复选框触发
  const onCheck = (checkedKeys, info) => {
    // 先置为空，在选
    setItemMenus([])
    setItemMenus(checkedKeys)
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
          <Input value={valueName} disabled />
        </Form.Item>
        <Tree
          checkable
          defaultExpandAll
          onCheck={onCheck}
          treeData={treeData}
          checkedKeys={MenusArr}
        />
      </Modal>
    </div>
  )
}
