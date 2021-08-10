/* 
  包含 n 个 action create 函数的模块
  同步 action：对象 { type:'xxx', data: 数据值 }
  异步 action：函数 dispatch => {}
*/
import { USER_KEY } from '../constant'

// user的 action
export const user = (data) => ({ type: USER_KEY, data })
