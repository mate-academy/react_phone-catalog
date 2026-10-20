import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from './context/CartContext/CartContext';
import { FavoritesProvider } from './context/FavoritesContext/FavoritesContext';
import { App } from './App';

const basename =
  import.meta.env.MODE === 'production' ? '/react_phone_catalog' : '';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router basename={basename}>
    <CartProvider>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </CartProvider>
  </Router>,
);
