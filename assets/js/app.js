import React from 'react';
import {render} from 'react-dom';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import App from './components/App';
import reducer from './reducers';

import '../scss/main.scss';

const middlewares = [thunk];
const store = createStore(reducer, applyMiddleware(...middlewares));

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('main'),
);
