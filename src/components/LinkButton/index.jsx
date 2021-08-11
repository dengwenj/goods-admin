import React from 'react'
import './index.less'

export default function LinkButton(props) {
  return <button {...props}></button>
}

// 函数式组件
// hooks
// 想要状态 可以使用 React.useStae()
// 返回值是一个包含两个元素的数组，第一个为内部当前状态值，第二个为更新状态值的函数
// const [] = React.useState(initValue)

/* import React from 'react'
import ReactDOM from 'react-dom'

// 类式组件
// class Demo extends React.Component {
//   state = { count: 0 }

//   add = () => {
//     // 新状态依赖旧状态
//     this.setState((state) => ({ count: state.count + 1 }))
//   }

//   myRef = React.createRef()

//   render() {
//     console.log(this)
//     return (
//       <div>
//         <input type="text" ref={this.myRef} />
//         <h2>当前数值为：{this.state.count}</h2>
//         <button onClick={this.add}>点我加一</button>
//       </div>
//     )
//   }
// }

// 函数式组件
function Demo() {
  // hooks 第一个 React.useState() 参数里面写的是初始值
  const [count, setCount] = React.useState(0)
  const [name, setName] = React.useState('xd')

  // 可以在函数组件里面使用生命周期
  // 后面不写数组，表示都点检测
  // 后面数组写状态，表示只检测那个状态
  // 后面写空数组，表示都不检测  相当于 componentDidMount
  React.useEffect(() => {
    let timer = setInterval(() => {
      // 接收原本状态的值返回新的值
      setCount((count) => count + 1)
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  const myRef = React.useRef()
 
  // 这些都是一个一个的函数
  function add() {
    // 返回的第一是 当前状态的值 , 第二个返回的是更新状态的方法
    // setCount(count + 1)
    setCount((count) => count + 1)
  }

  function userNmae() {
    setName('dengwenjie')
  }

  // 卸载组件
  function unmount() {
    ReactDOM.unmountComponentAtNode(document.querySelector('#root'))
  }

  function mmyyRef() {
    alert(myRef.current.value)
  }

  return (
    <div>
      <input type="text" ref={myRef} />
      <h2>当前数值为：{count}</h2>
      <h2>我是{name}</h2>
      <button onClick={add}>点我加一</button>
      <button onClick={userNmae}>改名字</button>
      <button onClick={unmount}>卸载组件</button>
      <button onClick={mmyyRef}>点我弹出框</button>
    </div>
  )
}

export default Demo

 */
