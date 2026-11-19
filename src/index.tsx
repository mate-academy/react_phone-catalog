import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter } from 'react-router-dom';
import { FavouritesProvider } from './context/FavouritesContext';
import { CartProvider } from './context/CartContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <FavouritesProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </FavouritesProvider>
  </HashRouter>,
);
