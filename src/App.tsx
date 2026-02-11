import './styles/global.scss';
import './App.scss';
import { HashRouter } from 'react-router-dom';
import { AppRouter } from './routes/AppRouter';
import { CartProvider } from './modules/CartFavContext/CartContext';
import { ThemeProvider } from './context/ThemeContext';

export const App = () => (
  <div className="App">
    <HashRouter>
      <ThemeProvider>
        <CartProvider>
          <AppRouter />
        </CartProvider>
      </ThemeProvider>
    </HashRouter>
  </div>
);
