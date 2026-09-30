import { createRoot } from 'react-dom/client';
import { Root } from './Root';
import './main.scss';
import { CartProvider } from './context/CartContext';
import { FavouritesProvider } from './context/FavouritesContext';

const container = document.getElementById('root') as HTMLElement;

createRoot(container).render(
  <CartProvider>
    <FavouritesProvider>
      <Root />
    </FavouritesProvider>
  </CartProvider>,
);
