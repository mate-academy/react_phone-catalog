import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { ProductsProvider } from './context/ProductContext';
import CartProvider from './context/CartContext';

ReactDOM.render(
  <BrowserRouter>
    <ProductsProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ProductsProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
