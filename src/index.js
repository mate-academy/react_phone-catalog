import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
import App from './App';

const Root = () => (
  <Router>
    <Route path="/" component={App} />
  </Router>
);

ReactDOM.render(<Root />, document.getElementById('root'));
