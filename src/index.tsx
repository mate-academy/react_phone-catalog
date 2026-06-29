import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter as Router } from 'react-router-dom';
import './styles/main.scss';
import { FavouritesProvider } from './contexts/FavouritesContext';
import { CartProvider } from './contexts/CartContext';
import { ScrollToTop } from './services/ToTop';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <ScrollToTop>
      <FavouritesProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </FavouritesProvider>
    </ScrollToTop>
  </Router>,
);
