// 用于动态生成侧边栏数据
import {
  HomeOutlined,
  UserOutlined,
  PieChartOutlined,
  LineChartOutlined,
  BarChartOutlined,
  AreaChartOutlined,
  ToolOutlined,
  BarsOutlined,
  AppstoreOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons'

const menuList = [
  {
    title: '首页',
    key: '/home',
    icon: <HomeOutlined />,
  },
  {
    title: '商品',
    key: '/shangpin',
    icon: <AppstoreOutlined />,
    children: [
      {
        title: '品类管理',
        key: '/category',
        icon: <BarsOutlined />,
      },
      {
        title: '商品管理',
        key: '/product',
        icon: <ToolOutlined />,
      },
    ],
  },
  {
    title: '用户管理',
    key: '/user',
    icon: <UserOutlined />,
  },
  {
    title: '角色管理',
    key: '/role',
    icon: <UsergroupAddOutlined />,
  },
  {
    title: '图形图标',
    key: '/tixingtubiao',
    icon: <AreaChartOutlined />,
    children: [
      {
        title: '柱状图',
        key: '/bar',
        icon: <BarChartOutlined />,
      },
      {
        title: '折线图',
        key: '/line',
        icon: <LineChartOutlined />,
      },
      {
        title: '饼图',
        key: '/pie',
        icon: <PieChartOutlined />,
      },
    ],
  },
]

export default menuList
