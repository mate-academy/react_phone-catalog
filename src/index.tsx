import { HashRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <FavoritesProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </FavoritesProvider>
  </HashRouter>,
);
