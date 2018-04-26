import axios from 'axios';
import { FETCH_MEETUPS } from './types';
import { SUBMIT_MEETUPS } from './types';
import { JOIN_MEETUPS } from './types';
import { FETCH_SINGLE_MEETUP } from './types';
import { QUIT_MEETUPS } from './types';
import { REMOVE_MEETUPS } from './types';
import { EXPIRED_MEETUPS } from './types';

export const submitMeetUps = (values) =>
    async dispatch => {
        try {
            const res = await axios.post('/api/meetup', values);
            dispatch({ type: SUBMIT_MEETUPS, payload: res.data });
        } catch (err) {
            console.log(err);
        }
    };

export const fetchMeetUps = () =>
    async dispatch => {
        try {
            const res = await axios.get('/api/meetup');
            dispatch({ type: FETCH_MEETUPS, payload: res.data });
        } catch (err) {
            console.log(err);
        }
    };

export const showMeetUps = (id) =>
    async dispatch => {
        try {
            const res = await axios.get(`/api/meetup/${id}`);
            dispatch({ type: FETCH_SINGLE_MEETUP, payload: res.data });
        } catch (err) {
            console.log(err);
        }
    };

export const joinMeetUps = (id) =>
    async dispatch => {
        try {
            const res = await axios.post(`/api/meetup/join/${id}`);
            dispatch({ type: JOIN_MEETUPS, payload: res.data });
        } catch (err) {
            console.log(err);
        }
    };

export const quitMeetUps = (id) =>
    async dispatch => {
        try {
            const res = await axios.post(`/api/meetup/quit/${id}`);
            dispatch({ type: QUIT_MEETUPS, payload: res.data });
        } catch (err) {
            console.log(err);
        }
    }

//from user info
export const removeMeetUps = (id) =>
async dispatch => {
    try {
        const res = await axios.post(`/api/meetup/remove/${id}`);
        dispatch({ type: REMOVE_MEETUPS, payload: res.data });
    } catch (err) {
        console.log(err);
    }
}

export const expiredMeetUps = (id) =>
    async dispatch => {
        try {
            const res = await axios.post(`/api/meetup/expired/${id}`);
            dispatch({ type: EXPIRED_MEETUPS, payload: res.data });
        } catch (err) {
            console.log(err);
        }
    }


