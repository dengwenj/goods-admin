import React from 'react'
import './index.less'
import { Button } from 'antd'

export default function NoFind(props) {
  return (
    <div className="no_find">
      <Button
        className="go_home"
        type="primary"
        onClick={() => props.history.replace('/home')}
      >
        返回首页
      </Button>
    </div>
  )
}
