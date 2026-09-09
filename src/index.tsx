import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './styles/index.scss';
import { App } from './App';
import { CartProvider } from './modules/shared/context/CartContext';
import { FavoritesProvider } from './modules/shared/context/FavoritesContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <CartProvider>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </CartProvider>
  </HashRouter>,
);
