import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { App } from './App';
import { HomePage } from './Components/HomePage/HomePage';
import { CatalogPage } from './Components/CatalogPage/CatalogPage';
import { ErrorPage } from './Components/ErrorPage/ErrorPage';
import { ProductPage } from './Components/ProductPage/ProductPage';
import { FavoritesPage } from './Components/FavoritesPage/FavoritesPage';
import { FavoritesProvider } from './context/favoritesContext';
import { CartProvider } from './context/cartContext';
import { CartPage } from './Components/CartPage/CartPage';
import { ScrollToTop } from './services/ScrollToTop';
import { Menu } from './Components/Menu/Menu';

export const Root = () => (
  <Router>
    <CartProvider>
      <FavoritesProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />

            <Route path="home" element={<Navigate to="/" replace />} />

            <Route path="phones">
              <Route index element={<CatalogPage />} />
              <Route path=":productId" element={<ProductPage />} />
            </Route>

            <Route path="tablets">
              <Route index element={<CatalogPage />} />
              <Route path=":productId" element={<ProductPage />} />
            </Route>

            <Route path="accessories">
              <Route index element={<CatalogPage />} />
              <Route path=":productId" element={<ProductPage />} />
            </Route>

            <Route path="favorites" element={<FavoritesPage />} />

            <Route path="cart" element={<CartPage />} />

            <Route path="menu" element={<Menu />} />

            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </FavoritesProvider>
    </CartProvider>
  </Router>
);
