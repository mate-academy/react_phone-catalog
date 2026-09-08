import { createRoot } from 'react-dom/client';
import { FavouriteProvider } from './store/FavouriteContext';
import { CartProvider } from './store/CartStore';
import { ProductsProvider } from './store/ProductContext';
import { Root } from './Root';
import { HashRouter } from 'react-router-dom';

const container = document.getElementById('root') as HTMLElement;

createRoot(container).render(
  <HashRouter>
    <FavouriteProvider>
      <CartProvider>
        <ProductsProvider>
          <Root />
        </ProductsProvider>
      </CartProvider>
    </FavouriteProvider>
  </HashRouter>,
);
