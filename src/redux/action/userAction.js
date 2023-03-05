import { postData } from '../../utils/fetchData'
import valid from '../../utils/valid'
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
    }catch (err) {
      dispatch({ 
          type: 'NOTIFY', 
          payload: {
              error: err.response.data.msg
          } 
      })
  }
}

export const refreshToken = () => async (dispatch) => {
    const firstLogin = localStorage.getItem('firstLogin');
    
    if(firstLogin){
        dispatch({type: 'NOTIFY', payload: {loading: true} })
        try {
            const res = await postData('refresh_token')
            dispatch({
                type: 'AUTH',
                payload: {token: res.data.access_token,
                user: res.data.user
                }
             }) 
             dispatch({type: 'NOTIFY', payload: {} })
        } catch(err){
            dispatch({ 
                type: 'NOTIFY', 
                payload: {
                    error: err.response.data.msg
                } 
            })
        }
    }
}


export const register = (data) => async (dispatch) => {
    try{
        const check = valid(data)
        if(check.errLength > 0)
            return dispatch({type:'NOTIFY', payload: check.errMsg})

            dispatch({type:'NOTIFY', payload:{loading: true}})
            const res = await postData('register', data)
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
    }catch(err) {
        dispatch({ 
            type: 'NOTIFY', 
            payload: {
                error: err.response.data.msg
            } 
        })
    }
}


export const logout = () => async (dispatch) => {
    try {
        localStorage.removeItem('firstLogin')
        await postData('logout')
        window.location.href = '/'

    }catch(err){
        dispatch({ 
            type: 'NOTIFY', 
            payload: {
                error: err.response.data.msg
            } 
        })
    }
}