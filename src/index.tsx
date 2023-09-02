import { HashRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { StrictMode } from 'react';

import App from './App';
import { StoragesProvider } from './Context/StoragesContext';

ReactDOM.render(
  <StoragesProvider>
    <HashRouter>
      <StrictMode>
        <App />
      </StrictMode>
    </HashRouter>
  </StoragesProvider>,
  document.getElementById('root'),
);
