import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './/styles/_global.scss';
import { App } from './App';
import { store } from './redux/store';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
