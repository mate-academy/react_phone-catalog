import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/index';
import { App } from './App';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
