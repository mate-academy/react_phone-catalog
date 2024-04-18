import './styles/main.scss';
import { HashRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './app/store';
import { ContextProvider } from './components/ContextProviders';

const root
  = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <HashRouter>
      <ContextProvider>
        <App />
      </ContextProvider>
    </HashRouter>
  </Provider>,
);
