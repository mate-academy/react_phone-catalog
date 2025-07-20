import { createRoot } from 'react-dom/client';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import { CartandFavProvider } from './components/CartandFavProvider';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <CartandFavProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CartandFavProvider>,
);
