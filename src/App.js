import React, { Component } from 'react'
import { Button } from 'antd'
import './App.less'
// import 'antd/dist/antd.less' 按需打包了 就不用写这个了

export default class App extends Component {
  render() {
    return (
      <div>
        <Button type="primary">Primary Button</Button>
      </div>
    )
  }
}
