import {applyMiddleware, compose, createStore} from 'redux';

import rootReducer from './reducers/index';

import logMiddleware from './middleware/log';
import apiMiddleware from './middleware/api';

const middleware = applyMiddleware(
    logMiddleware,
    apiMiddleware
)

const store = createStore(rootReducer, compose(middleware));

window.store = store;

export default store;