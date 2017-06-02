'use strict';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';

import * as appReducers from '../sections/App/reducers';
import * as menuReducers from '../reducers/menu';
import * as sectionManagerReducers from '../reducers/sectionManager';
import * as externalAPIsReducers from '../reducers/externalAPIs';

const reducer = combineReducers({
  ...appReducers,
  ...menuReducers,
  ...sectionManagerReducers,
  ...externalAPIsReducers,
  routing: routerReducer
});

const composeEnhancers = process.env.NODE_ENV==='development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);
