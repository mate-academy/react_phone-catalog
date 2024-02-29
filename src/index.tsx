import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import './style/main.scss';

import App from './App';
import { PhoneCatalogProvider } from './PhoneCatalogContext';

ReactDOM.render(
  <HashRouter>
    <PhoneCatalogProvider>
      <App />
    </PhoneCatalogProvider>
  </HashRouter>,
  document.getElementById('root'),
);
