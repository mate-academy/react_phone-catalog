import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from './context/CartContext/CartContext';
import { FavoritesProvider } from './context/FavoritesContext/FavoritesContext';
import { App } from './App';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router basename={import.meta.env.PROD ? '/react_phone-catalog' : '/'}>
    <CartProvider>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </CartProvider>
  </Router>,
);
