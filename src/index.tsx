import { createRoot } from 'react-dom/client';
import { Root } from './Root';
import { CartProvider } from './store/CartContext';
import { FavProvider } from './store/FavContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <CartProvider>
    <FavProvider>
      <Root />
    </FavProvider>
  </CartProvider>,
);
