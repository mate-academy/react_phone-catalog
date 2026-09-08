import { createRoot } from 'react-dom/client';
import './styles/reset.css';
import { App } from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
