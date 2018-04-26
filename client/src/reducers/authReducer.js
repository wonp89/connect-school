import { FETCH_USER } from '../actions/types';
export default (state = null, action) => {
    switch (action.type) {
        case FETCH_USER:
            //'false' for 'user logged out'
            return action.payload || false;
        default:
            return state;
    }
};