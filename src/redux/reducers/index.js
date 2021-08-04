import { combineReducers } from 'redux'
import userRducer from './user'

// 保存总状态  全部合并在一起
const allReducer = combineReducers({
  user_key: userRducer,
})

export default allReducer
