import React, { useEffect, useState } from 'react'
import { Table, Modal, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

// 网络请求
import { getUserAll, deleteUserById } from '../../../api/user'

import LinkButton from '../../../components/LinkButton'
import './index.less'

const { confirm } = Modal

export default function UserTable(props) {
  const [UserList, setUserList] = useState([])

  useEffect(() => {
    // 发送请求
    _getUserAll()
  }, [])

  const _getUserAll = async () => {
    const res = await getUserAll()
    setUserList(res.data)
  }

  const deleteUser = (id) => {
    return () => {
      confirm({
        title: '提示',
        icon: <ExclamationCircleOutlined />,
        content: '确认删除吗？',
        onOk: async () => {
          // 发送请求
          await deleteUserById(id)
          message.success('删除成功')
          // 删除成功重新加载
          _getUserAll()
        },
        onCancel() {},
      })
    }
  }

  const columns = [
    {
      title: '用户名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '所属角色',
      dataIndex: 'roleId',
      render: (value, item, index) => <div>{item.name}</div>,
    },
    {
      title: '操作',
      render: (item) => (
        <div>
          <LinkButton style={{ marginRight: 10 }}>修改</LinkButton>
          <LinkButton onClick={deleteUser(item.id)}>删除</LinkButton>
        </div>
      ),
    },
  ]

  return (
    <div>
      <Table
        bordered
        rowKey={(item) => item.id}
        dataSource={UserList}
        columns={columns}
        pagination={{
          defaultPageSize: 5,
          pageSizeOptions: [5, 10, 15, 20],
          showQuickJumper: true,
        }}
      />
    </div>
  )
}
