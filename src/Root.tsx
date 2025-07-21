import React from 'react';
import { Provider as AppState } from 'react-redux';
import { store } from './store';
import { AppRouter } from './router';

export const Root: React.FC = () => (
  <AppState store={store}>
    <AppRouter />
  </AppState>
);
