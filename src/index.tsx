import App from './App';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <FavoritesProvider>
    <CartProvider>
      <Router>
        <App />
      </Router>
    </CartProvider>
  </FavoritesProvider>,
);
