import { createRoot } from 'react-dom/client';
import { App } from './App';
import { CartProvider } from './modules/shared/contexts/CartContext';
import { FavoritesProvider } from './modules/shared/contexts/FavoritesContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <FavoritesProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </FavoritesProvider>,
);
