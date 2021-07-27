import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import {HashRouter as Router} from 'react-router-dom'
import { createStore } from 'redux';
import {Provider} from 'react-redux'
import { rootReducer } from './redux/rootReducer';

export const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
