import React, { useState } from 'react'
import ReactECharts from 'echarts-for-react'
import { Card, Button } from 'antd'

export default function Line() {
  const [xl, setXl] = useState([5, 20, 36, 10, 10, 20])
  const [stores, setStores] = useState([10, 30, 50, 20, 20, 30])

  const getOption = () => {
    return {
      title: {
        text: '销量和库存',
      },
      tooltip: {},
      legend: {
        data: ['销量', '库存'],
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'line',
          data: xl,
        },
        {
          name: '库存',
          type: 'line',
          data: stores,
        },
      ],
    }
  }

  const update = () => {
    setXl((state) => {
      return state.map((item) => item + 1)
    })
    setStores((state) => {
      return state.map((item) => item - 1)
    })
  }

  const title = (
    <Button type="primary" onClick={update}>
      更新
    </Button>
  )
  return (
    <div>
      <Card title={title}>
        <Card title="折线图">
          <ReactECharts option={getOption()} />
        </Card>
      </Card>
    </div>
  )
}
