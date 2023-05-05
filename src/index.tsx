import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import { App } from './App';
import './styles/index.scss';

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('root'),
);
