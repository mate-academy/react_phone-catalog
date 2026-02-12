import { createRoot } from 'react-dom/client';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import { CartandFavProvider } from './components/CartandFavProvider';
import { ScrollToTop } from './components/ScrollToTop/ScrollToTop';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <CartandFavProvider>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </CartandFavProvider>,
);
