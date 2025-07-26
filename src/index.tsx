import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter as Router } from 'react-router-dom';
import { CartProvider } from './modules/CartPage/context/CartContext';
// eslint-disable-next-line max-len
import { FavouriteProvider } from './modules/FavouritesPage/context/FavouritesContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <FavouriteProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </FavouriteProvider>
  </Router>,
);
