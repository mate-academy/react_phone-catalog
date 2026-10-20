import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom'; // <-- ОБОВ'ЯЗКОВО HashRouter!
import { CartProvider } from './context/CartContext/CartContext';
import { FavoritesProvider } from './context/FavoritesContext/FavoritesContext';
import { App } from './App';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <CartProvider>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </CartProvider>
  </Router>,
);
