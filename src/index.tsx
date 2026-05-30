import { createRoot } from 'react-dom/client';
import './styles/main.scss';
import { Root } from './Root';
import { Provider } from 'react-redux';
import { store } from './store/store';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <Root />
  </Provider>,
);
