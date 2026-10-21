import { createRoot } from 'react-dom/client';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import './global.scss';
import { CartProvider } from './modules/context/CartContext';
import { FavoritesProvider } from './modules/context/FavoritesContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <CartProvider>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </CartProvider>
  </BrowserRouter>,
);
