import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from '../modules/HomePage';
import { ProductsPage } from '../modules/ProductsPage';
import { ProductDetailsPage } from '../modules/ProductDetailsPage';
import { CartPage } from '../modules/CartPage';
import { FavoritesPage } from '../modules/FavoritesPage';
import { NotFoundPage } from '../modules/NotFoundPage';

export const AppRouter = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/home" element={<Navigate to="/" replace />} />

    <Route
      path="/phones"
      element={<ProductsPage category="phones" title="Mobile phones" />}
    />
    <Route
      path="/tablets"
      element={<ProductsPage category="tablets" title="Tablets" />}
    />
    <Route
      path="/accessories"
      element={<ProductsPage category="accessories" title="Accessories" />}
    />

    <Route path="/product/:productId" element={<ProductDetailsPage />} />
    <Route path="/cart" element={<CartPage />} />
    <Route path="/favorites" element={<FavoritesPage />} />

    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);
