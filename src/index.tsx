import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { Root } from './Root';
import { ProductsProvider } from './store/ProductsContext';
import { CartProvider } from './store/CartContext';
import { FavouriteProvider } from './store/FavouriteContext';

const container = document.getElementById('root') as HTMLElement;

createRoot(container).render(
  <Router>
    <FavouriteProvider>
      <CartProvider>
        <ProductsProvider>
          <Root />
        </ProductsProvider>
      </CartProvider>
    </FavouriteProvider>
  </Router>,
);
