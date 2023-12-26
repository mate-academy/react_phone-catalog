import { createRoot } from 'react-dom/client';
import './styles/index.scss';
import { Provider } from 'react-redux';
import { Root } from './Root';
import store from './app/store';

const container = document.getElementById('root') as HTMLElement;

createRoot(container).render(
  <Provider store={store}>
    <Root />
  </Provider>,
);
