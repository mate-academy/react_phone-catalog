import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { App } from '../modules/shared/layout/App';
import { HomePage } from '../modules/HomePage/HomePage';
import { ProductsPage } from '../modules/ProductsPage/ProductsPage';
import { ProductDetailsPage } from '../modules/ProductDetailsPage/ProductDetailsPage';
import { FavouritesPage } from '../modules/FavouritesPage/FavouritesPage';
import { CartPage } from '../modules/CartPage/CartPage';
import { NotFoundPage } from '../modules/NotFoundPage/NotFoundPage';
import { ScrollToTop } from '../modules/shared/components/ScrollToTop';
import type { FC } from 'react';

export const AppRouter: FC = () => {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} errorElement={<NotFoundPage />}>
          <Route index element={<HomePage />} />
          <Route path=":category" element={<ProductsPage />} />
          <Route path="product/:itemId" element={<ProductDetailsPage />} />
          <Route path="favourites" element={<FavouritesPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
