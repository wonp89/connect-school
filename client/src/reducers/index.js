import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import userInfoReducer from './userInfoReducer';
import meetUpReducer from './meetUpReducer';

export default combineReducers({
    auth: authReducer,
    meetUp: meetUpReducer,
    userInfo: userInfoReducer,
    form: reduxForm,
})