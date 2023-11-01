import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { Root } from './Root';
import { CartProvider } from './storage/CartContext';
import { FavProvider } from './storage/FavContext';

ReactDOM.render(
  <Router>
    <CartProvider>
      <FavProvider>
        <Root />
      </FavProvider>
    </CartProvider>
  </Router>,
  document.getElementById('root'),
);
