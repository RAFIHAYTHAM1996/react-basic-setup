'use strict';
import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, IndexRedirect, useRouterHistory, Redirect} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { Provider } from 'react-redux';
import detect from '../util/detect';

import store from '../store';
import App from '../sections/App/App';
import Landing from '../sections/Landing/Landing';
import Work from '../sections/Work/Work';
import Section from '../components/Section/Section';
import SectionManager from '../components/SectionManager/SectionManager';

const history = syncHistoryWithStore(useRouterHistory(createBrowserHistory)({ basename: process.env.BASENAME }), store);

let Test;
let TestRoutes;
if (process.env.NODE_ENV === 'development') {
  window.Perf = require('react-addons-perf');
  Test = require('../test/index').default;
  TestRoutes = require('../test/routes').default;
}

export default function() {
  const container = document.createElement('div');
  container.id = 'container';
  document.body.appendChild(container);
  document.body.className = [...document.body.className.split(' '), ...detect.classes].join(' ');

  render((
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
        <IndexRoute component={SectionManager}/>
        <Route path="home" component={SectionManager}/>
        <Route path="work" component={SectionManager}/>
        <Route path="contact" component={SectionManager}/>
          {TestRoutes && <Route path="/test" component={Test}>{TestRoutes}</Route>}
          <Redirect path="*" to="/"/>
        </Route>
      </Router>
    </Provider>
  ), container);
}
