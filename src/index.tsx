import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { CartAndFavProvider } from './context/CartAndFavContext';
import { ProductProvider } from './context/ProductContext';

ReactDOM.render(
  <Router>
    <CartAndFavProvider>
      <ProductProvider>
        <App />
      </ProductProvider>
    </CartAndFavProvider>
  </Router>,
  document.getElementById('root'),
);
