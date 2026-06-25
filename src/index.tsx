import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <CartProvider>
    <FavoritesProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </FavoritesProvider>
  </CartProvider>,
);
