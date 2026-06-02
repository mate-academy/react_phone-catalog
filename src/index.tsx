import { createRoot } from 'react-dom/client';
import { App } from './App';
import { CartProvider } from './pages/CartPage/context/CartContext';
import { FavoriteProvider } from './pages/FavoritePage/context/FavoriteContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <CartProvider>
    <FavoriteProvider>
      <App />
    </FavoriteProvider>
  </CartProvider>,
);
