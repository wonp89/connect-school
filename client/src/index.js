import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

// to test axios in browser console
import axios from 'axios';
window.axios = axios;

// middleware logger
const logger = store =>
    next =>
        action => {
            console.log('ReduxMiddleWare Dispatching', action);
            const result = next(action);
            console.log('ReduxMiddleWare nextstate', store.getState())
            return result;
        }

const store = createStore(reducers, {}, applyMiddleware(logger, reduxThunk));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
