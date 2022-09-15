import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import './styles/reset.css';
import { App } from './App';

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('root'),
);
