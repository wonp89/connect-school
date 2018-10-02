import axios from 'axios';
import { formatListing } from '../helpers/formatValues';
import { FETCH_EVENTS } from './types';
import { SUBMIT_EVENT } from './types';
import { JOIN_EVENT } from './types';
import { FETCH_SINGLE_EVENT } from './types';
import { QUIT_EVENT } from './types';
import { REMOVE_EVENT } from './types';
import { EXPIRED_EVENTS } from './types';

export const submitEvent = (values) => {
    // const options = formatListing(values);
    // console.log(options) will return empty object becasue formatData not stringifyable
    return async dispatch => {
        try {
            const res = await axios.post('/api/event', values);
            dispatch({ type: SUBMIT_EVENT, payload: res.data });
        } catch (err) {
            console.log(err);
        }
    };
}


export const fetchEvents = () =>
    async dispatch => {
        try {
            const res = await axios.get('/api/event');
            dispatch({ type: FETCH_EVENTS, payload: res.data });
        } catch (err) {
            console.log(err);
        }
    };

export const showEvent = (id) =>
    async dispatch => {
        try {
            const res = await axios.get(`/api/event/${id}`);
            dispatch({ type: FETCH_SINGLE_EVENT, payload: res.data });
        } catch (err) {
            console.log(err);
        }
    };

export const joinEvent = (id) =>
    async dispatch => {
        try {
            const res = await axios.post(`/api/event/join/${id}`);
            dispatch({ type: JOIN_EVENT, payload: res.data });
        } catch (err) {
            console.log(err);
        }
    };

export const quitEvent = (id) =>
    async dispatch => {
        try {
            const res = await axios.post(`/api/event/quit/${id}`);
            dispatch({ type: QUIT_EVENT, payload: res.data });
        } catch (err) {
            console.log(err);
        }
    }

//from user info
export const removeEvent = (id) =>
    async dispatch => {
        try {
            const res = await axios.post(`/api/event/remove/${id}`);
            dispatch({ type: REMOVE_EVENT, payload: res.data });
        } catch (err) {
            console.log(err);
        }
    }

export const expiredEvents = (id) =>
    async dispatch => {
        try {
            const res = await axios.post(`/api/event/expired/${id}`);
            dispatch({ type: EXPIRED_EVENTS, payload: res.data });
        } catch (err) {
            console.log(err);
        }
    }


