import { FETCH_EVENTS } from '../actions/types';
import { SUBMIT_EVENT } from '../actions/types';
import { FETCH_SINGLE_EVENT } from '../actions/types';
import { JOIN_EVENT } from '../actions/types';
import { QUIT_EVENT } from '../actions/types';
import { EXPIRED_EVENTS } from '../actions/types';

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_EVENTS || EXPIRED_EVENTS:
            // why single page ajax request do not reaches to 'switch, case'??
            return action.payload;
        case FETCH_SINGLE_EVENT:
            return action.payload;
        default:
            // single page ajax request reaches to default
            if (action.type === JOIN_EVENT) {
                state = [{ event: action.payload, message: "Sucessfully joined! An Email has been sent with this event information", color: "green" }];
            } else if (action.type === QUIT_EVENT) {
                state = [{ event: action.payload, message: "You are dropped out from this event", color: "red" }];
            } else if (action.type === SUBMIT_EVENT) {
                window.location.assign('/event');
            } 
            return state;
    }
}