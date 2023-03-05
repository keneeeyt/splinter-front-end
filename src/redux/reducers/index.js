
import { combineReducers } from 'redux'
import auth from './userReducer'
import notify from './notifyReducer'
import theme from './themeReducer'
import profile from './profileReducer'

export default combineReducers({
    

           
auth,
 notify,
 profile,
 theme,

 
})