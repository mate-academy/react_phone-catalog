import { Navigate, Route, Routes } from 'react-router-dom';

import { AppLayout } from './components/AppLayout';
import { CartPage } from './pages/CartPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { ProductsPage } from './pages/ProductsPage';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />

        <Route
          path="phones"
          element={<ProductsPage category="phones" title="Mobile phones" />}
        />

        <Route
          path="tablets"
          element={<ProductsPage category="tablets" title="Tablets" />}
        />

        <Route
          path="accessories"
          element={<ProductsPage category="accessories" title="Accessories" />}
        />

        <Route path="product/:productId" element={<ProductDetailsPage />} />

        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="cart" element={<CartPage />} />

        <Route path="home" element={<Navigate to="/" replace />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
