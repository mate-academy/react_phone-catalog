import { createRoot } from 'react-dom/client';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import './styles/global.scss';
import { Provider } from 'react-redux';
import { store } from './app/store';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);
