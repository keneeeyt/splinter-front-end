
import { combineReducers } from 'redux'
import auth from './userReducer'
import notify from './notifyReducer'
import theme from './themeReducer'
import profile from './profileReducer'
import status from './statusReducer'
import homePosts from './postReducer'
import modal from './modalReducer'
export default combineReducers({
    
auth,
 notify,
 profile,
 theme,
status,
 homePosts,
 modal
})