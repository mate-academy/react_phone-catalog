import ReactDOM from 'react-dom';
import { Root } from './Root';
import { AppProvider } from './context/AppContext';
import { CartProvider } from './context/CartContext';
import { FavProvider } from './context/FavContext';
import './index.scss';

ReactDOM.render(
  <AppProvider>
    <CartProvider>
      <FavProvider>
        <Root />
      </FavProvider>
    </CartProvider>
  </AppProvider>,
  document.getElementById('root'),
);
