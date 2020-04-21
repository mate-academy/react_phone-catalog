import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import {
  HashRouter,
  Route,
} from 'react-router-dom';
import App from './App';
import { store } from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Route component={App} />
    </HashRouter>
  </Provider>,
  document.getElementById('root'),
);
