import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter } from 'react-router-dom';
// eslint-disable-next-line max-len
import { CartProvider } from './modules/CartPage/components/CartContext/CartContext';
// eslint-disable-next-line max-len
import { FavoriteProvider } from './modules/FavoritesPage/FavoritesContext/FavoritesContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <CartProvider>
      <FavoriteProvider>
        <App />
      </FavoriteProvider>
    </CartProvider>
  </HashRouter>,
);
