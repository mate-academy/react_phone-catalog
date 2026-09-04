import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from './App';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';

const basename = new URL(import.meta.env.BASE_URL, window.location.origin)
  .pathname;

createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter basename={basename}>
    <CartProvider>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </CartProvider>
  </BrowserRouter>,
);
