import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';

import { App } from './App';

const container = document.getElementById('root');

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  container,
);
