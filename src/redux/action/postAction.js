
import { TYPES } from "./notifyAction";
import {imageUpload} from '../../utils/imageUpload';
import {postData} from '../../utils/fetchData';




export const POST_TYPES = {
    CREATE_POST: 'CREATE_POST'
}

export const createPost = ({content, images, auth}) => async (dispatch) => {
    let media = [];
    try{
        dispatch({type: TYPES.NOTIFY, payload: {loading: true}})
        if(images.length > 0) media = await imageUpload(images)
         console.log(media)
         const res = await postData('posts', {content, images: media}, auth.token)
         dispatch({type: POST_TYPES.CREATE_POST, payload: res.data.newPost})
         dispatch({type: TYPES.NOTIFY, payload: {loading: false}})
    }catch(err){
        dispatch({
            type:TYPES.NOTIFY,
            payload: {error: err.response.data.msg}
        })
    }
}