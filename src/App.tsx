import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './modules/HomePage';
import { ProductPage } from './modules/ProductPage';
import { NotFoundPage } from './modules/NotFoundPage';
import { CartPage } from './modules/CartPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { Layout } from './modules/shared/ui/Layout/Layout';
import { ProductDetailsPage } from './modules/ProductDetailsPage';

export const App = () => (
  <div data-cy="app">
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />

        <Route path="phones" element={<ProductPage category="phones" />} />

        <Route path="tablets" element={<ProductPage category="tablets" />} />

        <Route
          path="accessories"
          element={<ProductPage category="accessories" />}
        />

        <Route path="product/:productId" element={<ProductDetailsPage />} />

        <Route path="cart" element={<CartPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </div>
);
