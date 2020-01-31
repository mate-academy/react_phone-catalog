import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from 'react-router-dom';
import App from './App';
import {Provider} from 'react-redux'
import {state} from "./store/store";


ReactDOM.render(
  <HashRouter>
    <Provider store={state}>
      <App/>
    </Provider>
  </HashRouter>, document.getElementById('root')
);
