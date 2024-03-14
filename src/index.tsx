import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { Root } from './Root';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <Root />
  </Provider>,
);
