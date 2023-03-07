
import { TYPES } from '../action/notifyAction';



const statusReducer = (state = false, action) => {
    switch (action.type){
        case TYPES.STATUS:
            return action.payload;
        default:
            return state;
    }
}


export default statusReducer