import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';

import { ProductsProvider } from './modules/shared/context/ProductsContext';
import { CartProvider } from './modules/shared/context/CartContext';
import { FavoritesProvider } from './modules/shared/context/FavoritesContext';
import { ThemeProvider } from './modules/shared/context/ThemeContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider>
    <CartProvider>
      <FavoritesProvider>
        <ProductsProvider>
          <HashRouter>
            <AppRoutes />
          </HashRouter>
        </ProductsProvider>
      </FavoritesProvider>
    </CartProvider>
  </ThemeProvider>,
);
