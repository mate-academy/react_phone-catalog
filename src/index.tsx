import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
} from 'react-router-dom';

import { Root } from './Root';

import './styles/main.scss';

ReactDOM.render(
  <Router>
    <Root />
  </Router>,
  document.getElementById('root'),
);
