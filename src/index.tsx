import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { FavoritesProvider } from './shared/context/FavoriteContext';
import { CartProvider } from './shared/context/CartContext';

import { App } from './App';

import './styles/index.scss';
import { ThemeProvider } from './shared/context/ThemeContext';
import { ProductsProvider } from './shared/context/ProductsContext';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <Router>
    <ThemeProvider>
      <ProductsProvider>
        <FavoritesProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </FavoritesProvider>
      </ProductsProvider>
    </ThemeProvider>
  </Router>,
);
