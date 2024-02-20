import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { ProductsProvider } from './store/ProductsContext';

import { Root } from './Root';
import { FavouritesProductsProvider } from './store/FavouritesContext';
import { CartProvider } from './store/CartContext';

createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <Router>
      <ProductsProvider>
        <FavouritesProductsProvider>
          <CartProvider>
            <Root />
          </CartProvider>
        </FavouritesProductsProvider>
      </ProductsProvider>
    </Router>,
  );
