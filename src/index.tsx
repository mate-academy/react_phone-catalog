import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { ProductsProvider } from './context/ProductContext';
import CartProvider from './context/CartContext';
import FavouritesProvider from './context/FavsContext';

ReactDOM.render(
  <BrowserRouter>
    <ProductsProvider>
      <CartProvider>
        <FavouritesProvider>
          <App />
        </FavouritesProvider>
      </CartProvider>
    </ProductsProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
