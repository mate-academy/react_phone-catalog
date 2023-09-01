import { HashRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';

import App from './App';
import { StoragesProvider } from './Context/StoragesContext';

ReactDOM.render(
  <StoragesProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </StoragesProvider>,
  document.getElementById('root'),
);
