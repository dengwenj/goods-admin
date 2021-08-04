// 用于动态生成侧边栏数据
import { AppstoreOutlined } from '@ant-design/icons'

const menuList = [
  {
    title: '首页',
    key: '/home',
    icon: <AppstoreOutlined />,
  },
  {
    title: '商品',
    key: '/shangpin',
    icon: <AppstoreOutlined />,
    children: [
      {
        title: '品类管理',
        key: '/category',
        icon: <AppstoreOutlined />,
      },
      {
        title: '商品管理',
        key: '/product',
        icon: <AppstoreOutlined />,
      },
    ],
  },
  {
    title: '用户管理',
    key: '/user',
    icon: <AppstoreOutlined />,
  },
  {
    title: '角色管理',
    key: '/role',
    icon: <AppstoreOutlined />,
  },
  {
    title: '图形图标',
    key: '/tixingtubiao',
    icon: <AppstoreOutlined />,
    children: [
      {
        title: '柱状图',
        key: '/bar',
        icon: <AppstoreOutlined />,
      },
      {
        title: '折线图',
        key: '/line',
        icon: <AppstoreOutlined />,
      },
      {
        title: '饼图',
        key: '/pie',
        icon: <AppstoreOutlined />,
      },
    ],
  },
]

export default menuList
