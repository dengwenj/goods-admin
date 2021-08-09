import React, { useEffect, useState } from 'react'
import { Table } from 'antd'

// 网络请求
import { getUserAll } from '../../../api/user'
import { byIdFindRole } from '../../../api/role'
import LinkButton from '../../../components/LinkButton'
import './index.less'

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
    render: () => (
      <div>
        <LinkButton style={{ marginRight: 10 }}>修改</LinkButton>
        <LinkButton>删除</LinkButton>
      </div>
    ),
  },
]

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
