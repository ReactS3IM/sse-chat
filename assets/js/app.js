import 'babel-polyfill';

import React from 'react';
import {render} from 'react-dom';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {createLogger} from 'redux-logger';
import App from './components/App';
import reducer from './reducers';

import '../scss/main.scss';

const middlewares = [thunk];
if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
}
const store = createStore(reducer, applyMiddleware(...middlewares));

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('main'),
);

