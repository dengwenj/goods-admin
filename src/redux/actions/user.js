/* 
  包含 n 个 action create 函数的模块
  同步 action：对象 { type:'xxx', data: 数据值 }
  异步 action：函数 dispatch => {}
*/
import { USER_SUCCESS, USER_ERROR, USER_LOGINOUT } from '../constant'
import { userLogin } from '../../api/user'
import { setItem, removeItem } from '../../utils/storage'
import { message } from 'antd'

// user 登录成功的同步 action
export const userSuccess = (data) => ({ type: USER_SUCCESS, data })

// user 登录失败的同步 action
export const userError = (data) => ({ type: USER_ERROR, data })

// 退出的同步 action
export const loginOut = (data) => {
  removeItem('user')
  return { type: USER_LOGINOUT, data }
}

// 登录的异步 action
export const login = (values) => {
  return async (dispatch) => {
    // 做异步操作
    const res = await userLogin(values)
    // 1 登录成功获取 user 信息 分发一个成功的同步 action
    if (res.data.status === 0) {
      setItem('user', res.data.data)
      dispatch(userSuccess(res.data.data))
      // 登录成功还要把数据存到本地存储 仅仅是为了数据持久化
      return
    }
    // 2 登录失败提示用户 分发一个失败的同步 action
    message.error('用户名或密码错误')
    dispatch(userError('用户名或密码错误'))
  }
}
