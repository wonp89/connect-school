import { FETCH_EVENTS } from '../actions/types';
import { SUBMIT_EVENT } from '../actions/types';
import { FETCH_SINGLE_EVENT } from '../actions/types';
import { JOIN_EVENT } from '../actions/types';
import { QUIT_EVENT } from '../actions/types';
import { EXPIRED_EVENTS } from '../actions/types';

export default (state = [], action) => {
    console.log(action.type)
    switch (action.type) {
        case FETCH_EVENTS || EXPIRED_EVENTS:
            return action.payload;
        case FETCH_SINGLE_EVENT:
            return action.payload;
        case JOIN_EVENT:
            state = [{ event: action.payload, message: "Sucessfully joined! An Email has been sent with this event information", color: "green" }];
            return state;
            break;
        case QUIT_EVENT:
            state = [{ event: action.payload, message: "You are dropped out from this event", color: "red" }];
            return state;
            break;
        case SUBMIT_EVENT:
            window.location.assign('/event');
        default:
            return state;
    }
}