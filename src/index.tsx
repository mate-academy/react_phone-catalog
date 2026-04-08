import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter as Router } from 'react-router-dom';
import './styles/fonts.scss';
import { FavoritesProvider } from './modules/shared/context/FavoritesContext';
import { CartProvider } from './modules/shared/context/CartContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <CartProvider>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </CartProvider>
  </Router>,
);
