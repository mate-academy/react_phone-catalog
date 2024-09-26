import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import React from 'react';
import { App } from './App';
import { HomePage } from './pages/Homepage/Homepage';
import { PhonesPage } from './pages/PhonesPage/PhonesPage';
import { TabletsPage } from './pages/TabletsPage/TabletsPage';
import { AccessoriesPage } from './pages/AcessoriesPage/AcessoriesPage';
import { FavouritesPage } from './pages/FavouritesPage/FavouritesPage';
import { CartPage } from './pages/CartPage/CartPage';
import { RoutesPathes } from './utils/RoutesPathes';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { AboutPage } from './pages/AboutPage/AboutPage';
import { FavoritesProvider } from './context/FavoritesContext';

export const Root: React.FC = () => (
  <FavoritesProvider>
    
    <HashRouter>
      <Routes>
        <Route path="/home" element={<Navigate to={RoutesPathes.HOME} replace />} />
        <Route path={RoutesPathes.HOME} element={<App />}>
          <Route index element={<HomePage />} />

          <Route path={RoutesPathes.PHONES}>
            <Route index element={<PhonesPage />} />
            <Route path=":phonesId" element={<PhonesPage />} />
          </Route>

          <Route path={RoutesPathes.TABLETS}>
            <Route index element={<TabletsPage />} />
            <Route path=":tabletsId" element={<TabletsPage />} />
          </Route>

          <Route path={RoutesPathes.ACCESSORIES}>
            <Route index element={<AccessoriesPage />} />
            <Route path=":accessoriesId" element={<AccessoriesPage />} />
          </Route>

          <Route path={RoutesPathes.FAVOURITES} element={<FavouritesPage />} />
          <Route path={RoutesPathes.CART} element={<CartPage />} />
          <Route path={RoutesPathes.ABOUT} element={<AboutPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  </FavoritesProvider>
);
