import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import App from './App';
import { ProductsProvider } from './context/ProductContext';
import CartProvider from './context/CartContext';
import FavouritesProvider from './context/FavsContext';
import { QueryProvider } from './context/QueryContext';
import { PageProvider } from './context/PageContext';

ReactDOM.render(
  <HashRouter>
    <ProductsProvider>
      <CartProvider>
        <FavouritesProvider>
          <PageProvider>
            <QueryProvider>
              <App />
            </QueryProvider>
          </PageProvider>
        </FavouritesProvider>
      </CartProvider>
    </ProductsProvider>
  </HashRouter>,
  document.getElementById('root'),
);
