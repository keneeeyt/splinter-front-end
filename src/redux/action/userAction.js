import { postData } from '../../utils/fetchData'

export const TYPES = {
    AUTH: 'AUTH'
}

export const login = (data) => async(dispatch) => {
    try{
         dispatch({
            type: 'NOTIFY',
            payload: {loading: true}
         }) 
         const res = await postData('login', data )
         dispatch({
            type: 'AUTH',
            payload: {token: res.data.accessToken,
            user: res.data.User
            }
         }) 

         localStorage.setItem('firstLogin', true)

         dispatch({
            type: 'NOTIFY',
            payload: {success:res.data.msg}
         }) 
    }catch(err){
        dispatch({
            type: 'NOTIFY',
            payload: {error: err.response.data.msg}
         }) 
    }
}