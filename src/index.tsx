import { createRoot } from 'react-dom/client';
import { Root } from './Root';
import { HeaderProvider } from './context/HeaderContext';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <CartProvider>
    <FavoritesProvider>
      <HeaderProvider>
        <Root />
      </HeaderProvider>
    </FavoritesProvider>
  </CartProvider>,
);
