import { createRoot } from 'react-dom/client';
import { App } from './App';

import { CartProvider } from './modules/shared/context/CartContext';
import { FavoritesProvider } from './modules/shared/context/FavoritesContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <CartProvider>
    <FavoritesProvider>
      <App />
    </FavoritesProvider>
  </CartProvider>,
);
