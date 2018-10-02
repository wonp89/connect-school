import { FETCH_USER_INFO } from '../actions/types';
import { EDIT_USER_INFO } from '../actions/types';
import { REMOVE_EVENT } from '../actions/types';

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_USER_INFO || EDIT_USER_INFO:
            return action.payload;
        case REMOVE_EVENT:
            window.location.assign('/userInfo');
        default:
            return state;
    }
}