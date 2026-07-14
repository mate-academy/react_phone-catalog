import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter } from 'react-router-dom';
import { CartProvider } from './modules/shared/store/CartContext';
import { FavoritesProvider } from './modules/shared/store/FavoritesContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <CartProvider>
    <FavoritesProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </FavoritesProvider>
  </CartProvider>,
);
