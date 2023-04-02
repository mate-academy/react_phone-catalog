import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import App from './App';
import { CatalogProvider } from './context';
import './index.scss';

ReactDOM.render(
  <HashRouter>
    <CatalogProvider>
      <App />
    </CatalogProvider>
  </HashRouter>,
  document.getElementById('root'),
);
