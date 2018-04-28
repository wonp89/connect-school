import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import userInfoReducer from './userInfoReducer';
import eventReducer from './eventReducer';

export default combineReducers({
    auth: authReducer,
    event: eventReducer,
    userInfo: userInfoReducer,
    form: reduxForm,
})