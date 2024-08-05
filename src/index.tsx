import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { root } from './Route';
import React from 'react';
import { persistor, store } from './store/Store';
// eslint-disable-next-line import/no-extraneous-dependencies
import { PersistGate } from 'redux-persist/integration/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Provider } from 'react-redux';

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={root} />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
