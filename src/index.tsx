import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { ProductsProvider } from './context/ProductContext';
import CartProvider from './context/CartContext';
import FavouritesProvider from './context/FavsContext';
import { QueryProvider } from './context/QueryContext';

ReactDOM.render(
  <BrowserRouter>
    <ProductsProvider>
      <CartProvider>
        <FavouritesProvider>
          <QueryProvider>
            <App />
          </QueryProvider>
        </FavouritesProvider>
      </CartProvider>
    </ProductsProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
