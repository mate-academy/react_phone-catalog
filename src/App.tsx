import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import { HomePage } from './modules/HomePage';
import { NotFoundPage } from './modules/NotFoundPage';
import { Layout } from './components/Layout';
import { ThemeProvider } from './context/ThemeContext';
import { CartPage } from './modules/CartPage';
import { CartProvider } from './context/CartContext';
import { FavouritesProvider } from './context/FavoritesContext';

export const App = () => (
  <div className="App">
    <ThemeProvider>
      <CartProvider>
        <FavouritesProvider>
          <HashRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="cart" element={<CartPage />}></Route>
                <Route index element={<HomePage />}></Route>
                <Route path="*" element={<NotFoundPage />}></Route>
              </Route>
            </Routes>
          </HashRouter>
        </FavouritesProvider>
      </CartProvider>
    </ThemeProvider>
  </div>
);
