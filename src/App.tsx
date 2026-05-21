import './styles/global.scss';
import './App.scss';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AppRouter } from './routes/AppRouter';
import { CartProvider } from './modules/CartFavContext/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { store } from './store/store';

export const App = () => (
  <div className="App">
    <Provider store={store}>
      <HashRouter>
        <ThemeProvider>
          <CartProvider>
            <AppRouter />
          </CartProvider>
        </ThemeProvider>
      </HashRouter>
    </Provider>
  </div>
);
