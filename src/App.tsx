import React, { FC } from 'react';
import { Provider } from 'react-redux';

import { store } from './app/store';
import { AppRoutes } from './routes';
import './styles/index.scss';

export const App: FC = () => {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
};
