import React from 'react';
import { Provider as AppState } from 'react-redux';
import { persistor, store } from './store';
import { AppRouter } from './router';
import { PersistGate } from 'redux-persist/integration/react';

export const Root: React.FC = () => (
  <AppState store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </AppState>
);
