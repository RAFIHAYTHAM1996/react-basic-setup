'use strict';
import { createStore, combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';

import * as appReducers from '../sections/App/reducers';
import * as menuReducers from '../reducers/menu';
import * as sectionManagerReducers from '../reducers/sectionManager';

const reducer = combineReducers({
  ...appReducers,
  ...menuReducers,
  ...sectionManagerReducers,
  routing: routerReducer
});

export default createStore(reducer,
  process.env.NODE_ENV==='development' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
