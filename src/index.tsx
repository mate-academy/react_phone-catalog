/* eslint-disable import/no-extraneous-dependencies */
import { Provider } from 'react-redux';
import { store } from './app/store';
import { HashRouter } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';
import { createRoot } from 'react-dom/client';
createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  </Provider>,
);
