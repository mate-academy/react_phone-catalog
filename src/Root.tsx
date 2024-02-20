import { Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { AccessoriesPage } from './pages/AccessoriesPage/AccessoriesPage';
import { CartPage } from './pages/CartPage/CartPage';

import { FavouritesPage } from './pages/FavouritesPage/FavouritesPage';
import { HomePage } from './pages/HomePage/HomePage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { PhonesPage } from './pages/PhonesPage/PhonesPage';
import {
  ProductDetailsPage,
} from './pages/ProductDetailsPage/ProductDetailsPage';
import { TabletsPage } from './pages/TabletsPage/TabletsPage';

export const Root = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<Navigate to="home" replace />} />
      <Route path="home" element={<HomePage />} />
      <Route path="favourites" element={<FavouritesPage />} />
      <Route path="tablets" element={<TabletsPage />} />
      <Route path="accessories" element={<AccessoriesPage />} />
      <Route path="cart" element={<CartPage />} />

      <Route path="phones">
        <Route index element={<PhonesPage />} />
        <Route path=":itemId" element={<ProductDetailsPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);
