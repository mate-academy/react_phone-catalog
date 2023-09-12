import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import App from './App';
import './App.scss';
import { SiteProvider } from './components/SiteContex';

ReactDOM.render(
  <HashRouter>
    <SiteProvider>
      <App />
    </SiteProvider>
  </HashRouter>,
  document.getElementById('root'),
);
