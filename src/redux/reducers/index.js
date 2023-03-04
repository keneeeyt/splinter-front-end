
import { combineReducers } from 'redux'
import auth from './userReducer'
import notify from './notifyReducer'
import theme from './themeReducer'
export default combineReducers({
 auth,
 notify,
 theme
})