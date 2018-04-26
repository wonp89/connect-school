import axios from 'axios';
import { FETCH_USER } from './types';
import { FETCH_USER_INFO } from './types';
import { EDIT_USER_INFO } from './types';

//----- User ----//
export const fetchUser = () =>
    async dispatch => {
        const res = await axios.get('/api/current_user');
        dispatch({ type: FETCH_USER, payload: res.data });
    };

//----- User Info ------//
export const submitUserInfo = (values) =>
    async dispatch => {
        try {
            const res = await axios.post('/api/userInfo', values);
            dispatch({ type: FETCH_USER, payload: res.data });
        } catch (err) {
            console.log(err);
        }
    };

export const fetchUserInfo = () =>
    async dispatch => {
        try {
            const res = await axios.get('/api/userInfo');
            dispatch({ type: FETCH_USER_INFO, payload: res.data });
        } catch (err) {
            console.log(err);
        }
    }

export const editUserInfo = (values) =>
    async dispatch => {
        try {
            const res = await axios.post('/api/userInfoEdit', values)
            dispatch({ type: EDIT_USER_INFO, payload: res.data })
        } catch (err) {
            console.log(err);
        }
    }