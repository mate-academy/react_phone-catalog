import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import { HomePage } from './modules/HomePage';
import { NotFoundPage } from './modules/NotFoundPage';
import { Layout } from './components/Layout';
import { ThemeProvider } from './context/ThemeContext';
import { CartPage } from './modules/CartPage';
import { CartProvider } from './context/CartContext';
import { FavouritesProvider } from './context/FavoritesContext';
import { FavouritesPage } from './modules/FavouritesPage';

export const App = () => (
  <div className="App">
    <ThemeProvider>
      <CartProvider>
        <FavouritesProvider>
          <HashRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />

                <Route path="phones" element={<div>Phones</div>}></Route>
                <Route path="tablets" element={<div>Tablets</div>}></Route>
                <Route
                  path="accessories"
                  element={<div>Accessories</div>}
                ></Route>

                <Route path="favourites" element={<FavouritesPage />}></Route>
                <Route path="cart" element={<CartPage />}></Route>
                <Route
                  path="product/:productId"
                  element={<div>Деталі товару</div>}
                />

                <Route path="*" element={<NotFoundPage />}></Route>
              </Route>
            </Routes>
          </HashRouter>
        </FavouritesProvider>
      </CartProvider>
    </ThemeProvider>
  </div>
);
