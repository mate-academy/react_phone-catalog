import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store/store';
import './styles/index.scss';
import { App } from './App';
import { ScrollToTop } from './components/ScrollToTop';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
      <ScrollToTop />
    </BrowserRouter>
  </Provider>,
);
