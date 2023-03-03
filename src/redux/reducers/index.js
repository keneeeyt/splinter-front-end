
import { combineReducers } from 'redux'
import auth from './userReducer'
import notify from './notifyReducer'
export default combineReducers({
 auth,
 notify
})