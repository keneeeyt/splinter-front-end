
import { TYPES } from "./notifyAction";
import {imageUpload} from '../../utils/imageUpload';
import {postData, getData, patchData} from '../../utils/fetchData';
 




export const POST_TYPES = {
    CREATE_POST: 'CREATE_POST',
    LOADING_POST: 'LOADING_POST',
    GET_POSTS: 'GET_POSTS',
    UPDATE_POST: 'UPDATE_POST'

}

export const createPost = ({content, images, auth}) => async (dispatch) => {
    let media = [];
    try{
        dispatch({type: TYPES.NOTIFY, payload: {loading: true}})
        if(images.length > 0) media = await imageUpload(images)
         console.log(media)
         const res = await postData('posts', {content, images: media}, auth.token)
         dispatch({type: POST_TYPES.CREATE_POST, payload: {...res.data.newPost, user: auth.user}})
         dispatch({type: TYPES.NOTIFY, payload: {loading: false}})
    }catch(err){
        dispatch({
            type:TYPES.NOTIFY,
            payload: {error: err.response.data.msg}
        })
    }
}

export const getPosts = (token) => async (dispatch) => {
    try{    
            dispatch({type: POST_TYPES.LOADING_POST, payload: true})
            const res = await getData('posts', token)
            dispatch({type: POST_TYPES.GET_POSTS, payload: res.data})

            
            dispatch({type: POST_TYPES.LOADING_POST, payload: false})
    }catch(err){
        dispatch({
            type:TYPES.NOTIFY,
            payload: {error: err.response.data.msg}
        })
    }
}

export const updatePost = ({content, images, auth, status}) => async (dispatch) => {
    let media = [];

    const imgNewUrl = images.filter(img => !img.url)
    const imgOldUrl = images.filter(img => img.url)
   
    if(status.content === content && imgNewUrl === 0 && imgOldUrl.length === status.images.length) return;
    try{

        dispatch({type: TYPES.NOTIFY, payload: {loading: true}})
        if(imgNewUrl.length > 0) media = await imageUpload(imgNewUrl)
        //  console.log(media)
         const res = await patchData(`post/${status._id}`, {content, images: [...imgOldUrl,...media]}, auth.token)

         dispatch({type: POST_TYPES.UPDATE_POST, payload: res.data.newPost})
         dispatch({type: TYPES.NOTIFY, payload: {success: res.data.msg}})
       
    }catch(err){
        dispatch({
            type:TYPES.NOTIFY,
            payload: {error: err.response.data.msg}
        })
    }
}

export const likePost = ({post, auth}) => async (dispatch) => {

    const newPost = {...post, likes:[...post.likes, auth.user]}
    dispatch({type:POST_TYPES.UPDATE_POST, payload: newPost})

    try{
            await patchData(`post/${post._id}/like`, null, auth.token)
    }catch(err){
        dispatch({
            type:TYPES.NOTIFY,
            payload: {error: err.response.data.msg}
        })
    }
    
} 

export const unLikePost = ({post, auth}) => async (dispatch) => {
   
    const newPost = {...post,likes: post.likes.filter(like => like._id !== auth.user._id)}
  
    dispatch({type:POST_TYPES.UPDATE_POST, payload: newPost})

    try{
            await patchData(`post/${post._id}/unlike`, null, auth.token)
    }catch(err){
        dispatch({
            type:TYPES.NOTIFY, 
            payload: {error: err.response.data.msg}
        })
    }
    
} 