import { Provider } from 'react-redux';
import { store } from './redux/store';
import { createRoot } from 'react-dom/client';
import { Root } from './Root';
import './index.scss';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <Root />
  </Provider>,
);
