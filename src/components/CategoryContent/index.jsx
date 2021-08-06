import React, { Component } from 'react'
import { Table } from 'antd'
import LinkButton from '../LinkButton'

export default class CategoryContent extends Component {
  showSubCategorys = (id, name) => {
    return () => {
      // 子传父 把 id 传给父组件
      this.props.sub(id, name)
    }
  }

  render() {
    const { categorys, loading, parentId, subCategorys } = this.props

    const columns = [
      { title: '分类名称', dataIndex: 'name', key: 'name' },

      {
        title: '操作',
        width: 350,
        // 这里 render 里面有传参数过来  就是里面的每一项
        render: (item) => (
          <span>
            <LinkButton style={{ marginRight: '15px' }}>修改分类</LinkButton>
            {/* 这里可以用高阶函数 return 一个函数 也可以在外面包裹一个函数 把这每一项的 id传给父组件 才发请求 二级分类  */}
            {parentId === '0' ? (
              <LinkButton onClick={this.showSubCategorys(item.id, item.name)}>
                查看子分类
              </LinkButton>
            ) : null}
          </span>
        ),
      },
    ]
    return (
      <div>
        {/* record 是每一项 */}
        <Table
          rowKey={(record) => record.id}
          columns={columns}
          dataSource={parentId === '0' ? categorys : subCategorys}
          bordered
          pagination={{
            defaultPageSize: 5,
            pageSizeOptions: [5, 10, 15, 20],
          }}
          loading={loading}
        />
      </div>
    )
  }
}
