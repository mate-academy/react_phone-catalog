import ReactDOM from 'react-dom';
import { Root } from './Root';
import { CartProvider } from './context/CartContext';
import './index.scss';
import { FavouritesProvider } from './context/FavouritesContext';

ReactDOM.render(
  <CartProvider>
    <FavouritesProvider>
      <Root />
    </FavouritesProvider>
  </CartProvider>,
  document.getElementById('root'),
);
