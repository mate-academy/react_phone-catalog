import './styles/main.scss';

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '../src/app/store';
import { HashRouter } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  </Provider>,
);
