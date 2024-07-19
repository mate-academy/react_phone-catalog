import { createRoot } from 'react-dom/client';
import { Root } from './Root';
import { CartStateProvider } from './store/CartContext';
import { LikedStateProvider } from './store/FavouritesContext';
import { ThemeProvider } from './store/ThemeContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider>
    <CartStateProvider>
      <LikedStateProvider>
        <Root />
      </LikedStateProvider>
    </CartStateProvider>
  </ThemeProvider>,
);
