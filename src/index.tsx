import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';

import { AppRouter } from './Router/AppRouter';

ReactDOM.render(
  <Router>
    <AppRouter />
  </Router>,
  document.getElementById('root'),
);
