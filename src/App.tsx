import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { HomePage } from './modules/HomePage/HomePage';
import { CatalogPage } from './modules/CatalogPage/CatalogPage';
// eslint-disable-next-line max-len
import { ProductDetailsPage } from './modules/ProductDetailsPage/ProductDetailsPage';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';
import { CartPage } from './modules/CartPage/CartPage';
import { FavoritesPage } from './modules/FavoritesPage/FavoritesPage';
import './App.scss';

export const App = () => {
  return (
    <CartProvider>
      <FavoritesProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route
                path="phones"
                element={<CatalogPage category="phones" />}
              />
              <Route
                path="tablets"
                element={<CatalogPage category="tablets" />}
              />
              <Route
                path="accessories"
                element={<CatalogPage category="accessories" />}
              />
              <Route
                path="product/:productId"
                element={<ProductDetailsPage />}
              />
              <Route path="cart" element={<CartPage />} />
              <Route path="favorites" element={<FavoritesPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </HashRouter>
      </FavoritesProvider>
    </CartProvider>
  );
};
