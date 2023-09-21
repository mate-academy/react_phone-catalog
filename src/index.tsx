import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { ProductsProvider } from './context/ProductContext';
import CartProvider from './context/CartContext';
import FavouritesProvider from './context/FavsContext';
import { QueryProvider } from './context/QueryContext';
import { PageProvider } from './context/PageContext';

ReactDOM.render(
  <BrowserRouter>
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
  </BrowserRouter>,
  document.getElementById('root'),
);
