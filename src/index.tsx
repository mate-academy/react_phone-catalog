import './styles/main.scss';
import { HashRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './app/store';

const root
= ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
);
