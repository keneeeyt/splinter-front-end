import { POST_TYPES } from "../action/postAction";

const initialState = {
    posts: []
}

const postReducer = (state = initialState, action) => {
    switch (action.type){
        case POST_TYPES.CREATE_POST:
            return {
                ...state,
                posts: [...state.posts, action.payload]
            }
            default:
                return state;
    }
}

export default postReducer;