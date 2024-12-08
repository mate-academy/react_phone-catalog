import { createRoot } from 'react-dom/client';
import { Root } from './Root';
import './styles/main.css';
import { Provider } from 'react-redux';
import { store } from './utils/store';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <Root />
  </Provider>
);
