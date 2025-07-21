import React from 'react';
import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { App } from '../App';
import { HomePage } from '../pages/Home';
import { PhonesPage } from '../pages/Phones';
import { TabletsPage } from '../pages/Tablets';
import { AccessoriesPage } from '../pages/Accessories';
import { ProductDetailsPage } from '../pages/ProductDetails';
import { FavouritesPage } from '../pages/Favourites';
import { CartPage } from '../pages/Cart';
import { NotFoundPage } from '../pages/NotFound';

export const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />

          <Route path="phones">
            <Route index element={<PhonesPage />} />
            <Route path=":productId" element={<ProductDetailsPage />} />
          </Route>

          <Route path="tablets">
            <Route index element={<TabletsPage />} />
            <Route path=":productId" element={<ProductDetailsPage />} />
          </Route>

          <Route path="accessories">
            <Route index element={<AccessoriesPage />} />
            <Route path=":productId" element={<ProductDetailsPage />} />
          </Route>

          <Route path="favourites" element={<FavouritesPage />} />
          <Route path="cart" element={<CartPage />} />

          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
