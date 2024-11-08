import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import './i18n';

import { persistor, store } from '@store/store';

import { ThemeProvider } from '@context/ThemeProvider';

import { App } from '@components/app/App';

import './styles/index.scss';

const rootElement = document.getElementById('root');

createRoot(rootElement as HTMLElement).render(
  <Provider store={store}>
    <ThemeProvider>
      <PersistGate loading={null} persistor={persistor}>
        <HashRouter>
          <App />
        </HashRouter>
      </PersistGate>
    </ThemeProvider>
  </Provider>,
);
