import './styles/global.scss';
import './App.scss';
import { HashRouter } from 'react-router-dom';
import { AppRouter } from './routes/AppRouter';
import { CartProvider } from './modules/CartFavContext/CartContext';

export const App = () => (
  <div className="App">
    <HashRouter>
      <CartProvider>
        <AppRouter />
      </CartProvider>
    </HashRouter>
  </div>
);
