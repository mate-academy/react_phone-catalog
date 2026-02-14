import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store';
import { AppRoutes } from './AppRoutes';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <AppRoutes />
  </Provider>,
);
