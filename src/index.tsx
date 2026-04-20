import { createRoot } from 'react-dom/client';
import { App } from './App';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import { CartProvider } from './context/CartContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <FavoritesProvider>
    <CartProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CartProvider>
  </FavoritesProvider>,
);
