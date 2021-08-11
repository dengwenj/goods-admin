import { combineReducers } from 'redux'
import userRducer from './user'
import headerTitle from './headerTitle'

// 保存总状态  全部合并在一起
const allReducer = combineReducers({
  userLoginData: userRducer,
  headerTitle,
})

export default allReducer
