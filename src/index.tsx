import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
} from 'react-router-dom';

import { AppRoutes } from './Routes/AppRoutes';

ReactDOM.render(
  <Router>
    <AppRoutes />
  </Router>,
  document.getElementById('root'),
);
