import { createRoot } from 'react-dom/client';
import { Root } from './Root';
import './styles/main.scss';
import { FavoriteProvider } from './context/FavoriteContext';
import { CartProvider } from './context/CartContext';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <FavoriteProvider>
    <CartProvider>
      <Root />
    </CartProvider>
  </FavoriteProvider>,
);
