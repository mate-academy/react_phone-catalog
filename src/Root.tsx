import { Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { NotFoundPage } from './pages/NotFoundPage';
import React from 'react';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { CartPage } from './pages/CartPage';
import { FavouritesPage } from './pages/FavouritesPage';

export const Root: React.FC = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="home" element={<Navigate to="/" replace />} />

      <Route path="phones">
        <Route index element={<PhonesPage />} />
        <Route path=":phoneId" element={<PhonesPage />} />
      </Route>

      <Route path="tablets">
        <Route index element={<TabletsPage />} />
        <Route path=":tabletId" element={<TabletsPage />} />
      </Route>

      <Route path="accessories">
        <Route index element={<AccessoriesPage />} />
        <Route path=":accessoryId" element={<AccessoriesPage />} />
      </Route>

      <Route path="favourites">
        <Route index element={<FavouritesPage />} />
      </Route>

      <Route path="cart">
        <Route index element={<CartPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Route>
    {/* <Route path="/home" element={<Navigate to="/" replace />} /> */}
  </Routes>
);
