import { createRoot } from 'react-dom/client';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import { FavouritesProvider } from './context/FavouritesContext';
import { CartProvider } from './context/CartContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <FavouritesProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </FavouritesProvider>
  </BrowserRouter>,
);
