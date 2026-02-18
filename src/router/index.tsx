import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { App } from '../App';
import { HomePage } from '../pages/Home';
import { ProductsPage } from '../pages/Products';
import { ProductDetailsPage } from '../pages/ProductDetails';
import { FavouritesPage } from '../pages/Favourites';
import { CartPage } from '../pages/Cart';
import { NotFoundPage } from '../pages/NotFound';
import { ProductsLayout } from '../layouts/ProductsLayout';
import { FavouritesLayout } from '../layouts/FavouritesLayout';
import { CartLayout } from '../layouts/CartLayout';
import { ScrollToTop } from '../components/ScrollToTop';
import type { FC } from 'react';
import { Category } from '../types';

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
          <Route element={<ProductsLayout />}>
            <Route
              path="phones"
              element={
                <ProductsPage category={Category.Phones} title="Phones" />
              }
            />
            <Route
              path="tablets"
              element={
                <ProductsPage category={Category.Tablets} title="Tablets" />
              }
            />
            <Route
              path="accessories"
              element={
                <ProductsPage
                  category={Category.Accessories}
                  title="Accessories"
                />
              }
            />
          </Route>
          <Route path="product/:itemId" element={<ProductDetailsPage />} />
          <Route element={<FavouritesLayout />}>
            <Route path="favourites" element={<FavouritesPage />} />
          </Route>
          <Route element={<CartLayout />}>
            <Route path="cart" element={<CartPage />} />
          </Route>
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
