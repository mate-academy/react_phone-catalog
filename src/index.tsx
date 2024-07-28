import { createRoot } from 'react-dom/client';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Provider } from 'react-redux';

import { Root } from './Root';

import store from './app/store';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <Root />
  </Provider>,
);
