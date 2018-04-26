import { FETCH_USER_INFO } from '../actions/types';
import { EDIT_USER_INFO } from '../actions/types';
import { REMOVE_MEETUPS } from '../actions/types';

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_USER_INFO || EDIT_USER_INFO:
            return action.payload;
        default:
            if (action.type === REMOVE_MEETUPS) {
                window.location.assign('/userInfo');

                // -------------- need to figure out the ajax way ----------
                // state = [{userInfo: action.payload}]
            }
            return state;
    }
}