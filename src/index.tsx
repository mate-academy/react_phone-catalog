import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter } from 'react-router-dom';
import './styles/_variables.scss';
import { FavoritesProvider } from './context/FavoritesContext';
import { CartProvider } from './context/AddedToCartContext';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <CartProvider>
    <FavoritesProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </FavoritesProvider>
  </CartProvider>,
);
