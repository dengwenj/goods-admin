import React, { useEffect, useState } from 'react'
import PubSub from 'pubsub-js'
import { Table, Modal, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

// 网络请求
import { getUserAll, deleteUserById } from '../../../api/user'

import LinkButton from '../../../components/LinkButton'
import './index.less'

const { confirm } = Modal

export default function UserTable(props) {
  const { tableUpdataUser } = props

  const [UserList, setUserList] = useState([])

  useEffect(() => {
    // 发送请求
    _getUserAll()

    // 消息发布与订阅 点击了创建成功 就来到了这里 更新 table 数据
    const unSubscribe = PubSub.subscribe('addUser', () => {
      _getUserAll()
    })
    // 犯规一个函数这个函数就相当于 即将要卸载的钩子
    return () => {
      // 取消订阅
      PubSub.unsubscribe(unSubscribe)
    }
  }, [])

  // 发送请求 获取数据 展示在页面
  const _getUserAll = async () => {
    const res = await getUserAll()
    setUserList(res.data)
  }

  // 删除用户
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

  // 更新用户 点击修改
  const update = (item) => {
    return () => {
      tableUpdataUser(item, true)
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
      title: '所属角色Id',
      dataIndex: 'roleId',
      render: (value, item, index) => <div>{value}</div>,
    },
    {
      title: '操作',
      render: (item) => (
        <div>
          <LinkButton style={{ marginRight: 10 }} onClick={update(item)}>
            修改
          </LinkButton>
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
