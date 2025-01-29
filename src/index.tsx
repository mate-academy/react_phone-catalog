import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';
import { Provider } from 'react-redux';
import { persistor, store } from './app/store';
import { PersistGate } from 'redux-persist/integration/react';
createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <Router>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Router>
  </Provider>,
);
