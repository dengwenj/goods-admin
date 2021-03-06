import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import PubSub from 'pubsub-js'

// 网络请求
import { getRoles } from '../../../api/role'
import './index.less'

const columns = [
  {
    title: '角色名称',
    dataIndex: 'name',
    render: (value, item) => {
      // 看 item.name 是否包含 { 包含的话就进行里面的操作
      if (item.name.includes('{')) {
        // 把 JSON 格式的对象转换为 JS格式的对象
        const obj = JSON.parse(item.name)
        if (obj.name) {
          return <div>{obj.name}</div>
        }
      }
      return <div>{value}</div>
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
  {
    title: '授权时间',
    dataIndex: 'authTime',
  },
  {
    title: '授权人',
    dataIndex: 'authName',
  },
]

export default function RoleTable(props) {
  const { settingRole } = props
  // 相当于 class 组件 里面这样
  // state = { role: [] }
  const [roles, setRoles] = useState([])

  // 可以获取生命周期钩子
  // 第二参数传一个空数组的话，就表示只有挂载完毕的时候调用
  useEffect(() => {
    // 发送请求
    _getRoles()
    // 消息发布和订阅 只要那个组件通过了点击了 就会触发这个回调函数 然后就才次调用这里面的函数发送请求更新 table
    const unsubscribe = PubSub.subscribe('createRole', () => {
      // 第一种方式
      _getRoles()
      // 也可以用第二种方式 就是那个请求响应回来了一个数组把数组放到 roles 里面去
      // 不能用 push 的方法要重新换个数组 [...roles,...返回回来的数组] 然后更新状态就行了
      // 函数组件只要状态更改，函数就重新调用
      // setRoles((roles)=>[...roles,...返回回来的数组])
    })
    // 这里 return 一个函数了就相当于生命周期即将要卸载的钩子
    return () => {
      // 然后在这里面 取消订阅
      PubSub.unsubscribe(unsubscribe)
    }
  }, [])

  // 获取角色的请求
  const _getRoles = async () => {
    const res = await getRoles()
    // 更新状态
    const roles = res.data.data
    setRoles(roles)
  }

  // rowSelection 表格行是否可选择
  const rowSelection = {
    // 	选中项发生变化时的回调
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(selectedRowKeys) //指定选中项的 key 数组，需要和 onChange 进行配合
      // console.log(selectedRows) // selectedRows 这是个数组 数组里面的只有一个元素就是选中的那一项 0: {key: "1", name: "John Brown", age: 32, address: "New York No. 1 Lake Park", ren: "admin"}
      settingRole(false)
      // 发布消息
      PubSub.publish('roleName', selectedRows)
    },
  }

  return (
    <Table
      bordered
      rowKey={(item) => item.id}
      // rowSelection 是个对象格式 	object
      // ...rowSelection 这个的意思就是把定义的这个 rowSelection 里面的属性合并在这里 不让这里看起来臃肿 抽出去写
      rowSelection={{
        type: 'radio',
        ...rowSelection,
      }}
      columns={columns}
      dataSource={roles}
      pagination={{
        pageSizeOptions: [5, 10, 15, 20],
        defaultPageSize: 5,
        showQuickJumper: true,
      }}
    />
  )
}
