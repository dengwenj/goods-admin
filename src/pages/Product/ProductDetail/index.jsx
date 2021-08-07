import React, { Component } from 'react'
import { Card, List, Image } from 'antd'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'

// 网络请求
import { productsById } from '../../../api/products'
import { getCategoryOne } from '../../../api/category'
import './index.less'
import zwtp from '../../../assets/zwtp.png'

export default class ProductDetail extends Component {
  // 状态
  state = { detailData: {}, name: '', categoryName: '' }

  // 挂载完毕调用的钩子
  componentDidMount() {
    // 比如 this.props.history.push('/home/de',data)
    // 比如 this.props.location.state 这样就可以拿到传的第二个参数
    this._productsById() // 这里也可以不发请求 用路由传递过来的数据 push ... 的第二个参数可以传一些数据
  }

  _productsById = async () => {
    const { id } = this.props.match.params
    const res = await productsById(id)
    // console.log(res)
    // 存再状态里面
    const { data } = res
    // 更新状态
    this.setState({ detailData: data })
    // 在发请求
    const res1 = await getCategoryOne(data.categoryId)
    this.setState({
      name: res1.data.name,
      categoryName: res1.data.categoryName,
    })
  }

  handleGoBack = () => {
    this.props.history.goBack()
  }

  render() {
    const { detailData, name, categoryName } = this.state

    const title = (
      <div style={{ cursor: 'pointer' }} onClick={this.handleGoBack}>
        <ArrowLeftOutlined style={{ color: '#4b9eb4' }} />
        <span style={{ marginLeft: 10 }}>商品详情</span>
      </div>
    )

    const data = [detailData]

    return (
      <div>
        <Card title={title}>
          <List
            itemLayout="vertical"
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <div className="div">
                  <span className="name">商品名称：</span>
                  <span className="name_info">{item.name}</span>
                </div>
                <div className="div">
                  <span className="name">商品描述：</span>
                  <span className="name_info">{item.desc}</span>
                </div>
                <div className="div">
                  <span className="name">商品价格：</span>
                  <span className="name_info">￥{item.price}</span>
                </div>
                <div className="div">
                  <span className="name">所属分类：</span>
                  <span className="name_info">
                    {categoryName}
                    <ArrowRightOutlined style={{ margin: 8 }} />
                    {name}
                  </span>
                </div>
                <div className="div">
                  <span className="name">商品图片：</span>
                  {item.images ? (
                    <Image width={150} src={item.images} />
                  ) : (
                    <Image
                      width={150}
                      height={150}
                      src="error"
                      fallback={zwtp}
                    />
                  )}
                </div>
                <div className="div">
                  <span className="name">商品详情：</span>
                  {item.detail ? (
                    <span
                      className="name_info"
                      dangerouslySetInnerHTML={{ __html: item.detail }}
                    >
                      {/*写了 dangerouslySetInnerHTML 标签体里面不能写内容 相当于 innerHTML 就是在字符串里面写了标签会解析 */}
                    </span>
                  ) : (
                    <span className="name_info">暂无详情</span>
                  )}
                </div>
              </List.Item>
            )}
          />
          ,
        </Card>
      </div>
    )
  }
}
