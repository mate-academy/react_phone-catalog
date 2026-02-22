import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import { Root } from './Root';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <Root />
  </Provider>,
);
