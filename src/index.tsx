import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';

import { Root } from './routes/Root';
import { CategoryProvider } from './store/CategoryContext';
import { FilterProvider } from './store/FilterContext';
import { ProductProvider } from './store/ProductContext';
import { CartProvider } from './store/CartContext';
import { FavoritesProvider } from './store/FavoriteContext';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <Router>
    <ProductProvider>
      <CategoryProvider>
        <FilterProvider>
          <CartProvider>
            <FavoritesProvider>
              <Root />
            </FavoritesProvider>
          </CartProvider>
        </FilterProvider>
      </CategoryProvider>
    </ProductProvider>
  </Router>,
);
