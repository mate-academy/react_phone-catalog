import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import React from 'react';
import App from './App';

const Root: React.FC = () => (
  <Router>
    <App />
  </Router>
);

ReactDOM.render(<Root />, document.getElementById('root'));
