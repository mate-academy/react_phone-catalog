import { createRoot } from 'react-dom/client';
import { Root } from './Root';
import './styles/_index.scss';
import { FavoritesProvider } from './context/FavoritesContext';
import { CartProvider } from './context/CartContext';
const container = document.getElementById('root') as HTMLElement;

createRoot(container).render(
  <CartProvider>
    <FavoritesProvider>
      <Root />
    </FavoritesProvider>
  </CartProvider>,
);
