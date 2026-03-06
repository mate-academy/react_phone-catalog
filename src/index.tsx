import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter } from 'react-router-dom';
import { CartProvider } from './shared/components/CartContext/CartContext';
import { FavoritesProvider } from './shared/components/FavoritesContext/FavoritesContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <CartProvider>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </CartProvider>
  </HashRouter>,
);
