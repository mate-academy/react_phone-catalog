import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import App from './App';
import { NotFoundPage } from './modules/NotFoundPage';
import { CartPage } from './modules/CartPage/CartPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { HomePage } from './modules/HomePage';
import { CatalogPage } from './modules/CatalogPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';

export const Root = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="phones" element={<CatalogPage />} />
          <Route path="tablets" element={<CatalogPage />} />
          <Route path="accessories" element={<CatalogPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route
            path="product/:productId"
            element={<ProductDetailsPage />}
          ></Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
