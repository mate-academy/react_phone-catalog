import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Loader } from '../components/Loader';

const HomePage = lazy(() =>
  import('../modules/HomePage').then(m => ({ default: m.HomePage })),
);
const ProductListPage = lazy(() =>
  import('../modules/ProductListPage').then(m => ({
    default: m.ProductListPage,
  })),
);
const ProductDetailsPage = lazy(() =>
  import('../modules/ProductDetailsPage').then(m => ({
    default: m.ProductDetailsPage,
  })),
);
const CartPage = lazy(() =>
  import('../modules/CartPage').then(m => ({ default: m.CartPage })),
);
const FavoritesPage = lazy(() =>
  import('../modules/FavoritesPage').then(m => ({ default: m.FavoritesPage })),
);
const NotFoundPage = lazy(() =>
  import('../modules/NotFoundPage').then(m => ({ default: m.NotFoundPage })),
);

export const AppRoutes: React.FC = () => (
  <Suspense fallback={<Loader />}>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />

        <Route path="/phones" element={<ProductListPage category="phones" />} />
        <Route
          path="/tablets"
          element={<ProductListPage category="tablets" />}
        />
        <Route
          path="/accessories"
          element={<ProductListPage category="accessories" />}
        />

        <Route path="product/:productId" element={<ProductDetailsPage />} />

        <Route path="cart" element={<CartPage />} />
        <Route path="favorites" element={<FavoritesPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Suspense>
);
