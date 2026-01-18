import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { App } from './App';
import './styles/main.scss';
import { CartProvider } from './context/CartContext';
import { FavouritesProvider } from './context/FavouritesContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <CartProvider>
    <FavouritesProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </FavouritesProvider>
  </CartProvider>,
);
