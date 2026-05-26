import './App.scss';
import { HomePage } from './modules/HomePage';
import { PhonesPage } from './modules/PhonesPage';
import { Layout } from './modules/shared/components/Layout';
import { Route, Routes } from 'react-router-dom';
import { TabletsPage } from './modules/TabletsPage';
import { AccessoriesPage } from './modules/AccessoriesPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { Cart } from './modules/CartPage';
import { NotFoundPage } from './modules/NotFoundPage';
import { useState } from 'react';

export const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        }
      >
        <Route index element={<HomePage />} />
        <Route path="/phones" element={<PhonesPage />} />
        <Route path="/tablets" element={<TabletsPage />} />
        <Route path="/accessories" element={<AccessoriesPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
