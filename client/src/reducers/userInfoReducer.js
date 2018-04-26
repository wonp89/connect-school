import { FETCH_USER_INFO } from '../actions/types';
import { EDIT_USER_INFO } from '../actions/types';

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_USER_INFO || EDIT_USER_INFO:
            return action.payload;
        default:
            return state;
    }
}