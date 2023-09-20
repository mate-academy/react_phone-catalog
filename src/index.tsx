import ReactDOM from 'react-dom';
import { Root } from './Root';
import { CartProvider } from './contexts/CartContext';
import { FavsProvider } from './contexts/FavsContext';

ReactDOM.render(
  <CartProvider>
    <FavsProvider>
      <Root />
    </FavsProvider>
  </CartProvider>,
  document.getElementById('root'),
);
