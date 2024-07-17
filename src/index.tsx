import { createRoot } from 'react-dom/client';
import { Root } from './Root';
import { CartStateProvider } from './store/CartContext';
import { LikedStateProvider } from './store/FavouritesContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <CartStateProvider>
    <LikedStateProvider>
      <Root />
    </LikedStateProvider>
  </CartStateProvider>,
);
