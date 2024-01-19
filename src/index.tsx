import { HashRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { StrictMode } from 'react';

import App from './App';

ReactDOM.render(
  <HashRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </HashRouter>,
  document.getElementById('root'),
);
