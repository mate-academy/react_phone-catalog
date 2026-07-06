import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles/main.scss';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { SearchProvider } from './context/SearchContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <FavoritesProvider>
      <CartProvider>
        <SearchProvider>
          <App />
        </SearchProvider>
      </CartProvider>
    </FavoritesProvider>
  </BrowserRouter>,
);
