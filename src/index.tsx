import { createRoot } from 'react-dom/client';

import { HashRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import { Root } from './routes/index';
// src/index.js
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Root />
      </PersistGate>
    </Provider>
  </Router>,
);
