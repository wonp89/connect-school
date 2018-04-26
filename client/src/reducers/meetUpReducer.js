import { FETCH_MEETUPS } from '../actions/types';
import { SUBMIT_MEETUPS } from '../actions/types';
import { FETCH_SINGLE_MEETUP } from '../actions/types';
import { JOIN_MEETUPS } from '../actions/types';
import { QUIT_MEETUPS } from '../actions/types';
import { EXPIRED_MEETUPS } from '../actions/types';

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_MEETUPS || EXPIRED_MEETUPS:
            // why single page ajax request do not reaches to 'switch, case'??
            return action.payload;
        case FETCH_SINGLE_MEETUP:
            return action.payload;
        default:
            // single page ajax request reaches to default
            if (action.type === JOIN_MEETUPS) {
                state = [{ meetUp: action.payload, message: "You sucessfully joined this Meet Up" }];
            } else if (action.type === QUIT_MEETUPS) {
                state = [{ meetUp: action.payload, message: "You are dropped out from this Meet Up" }];
            } else if (action.type === SUBMIT_MEETUPS) {
                window.location.assign('/meetup');
            } 
            return state;
    }
}