import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './components/Pages/HomePage';
import { NotFoundPage } from './components/Pages/NotFoundPage';
import { PhonesPage } from './components/Pages/PhonesPage';
import { TabletsPage } from './components/Pages/TabletsPage';
import { AccessoriesPage } from './components/Pages/AccessoriesPage';
import { FavouritesPage } from './components/Pages/FavouritesPage';
import { ProductDetails } from './components/Pages/ProductDetails';
import { CartPage } from './components/Pages/CartPage';
import { NotFound } from './types';

export const Root = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />

        <Route path="/home" element={<HomePage />} />

        <Route path="/phones">
          <Route index element={<PhonesPage />} />
          <Route path=":phoneId" element={<ProductDetails />} />
        </Route>

        <Route path="/tablets">
          <Route index element={<TabletsPage />} />
          <Route path=":tabletId" element={<ProductDetails />} />
        </Route>

        <Route path="/accessories">
          <Route index element={<AccessoriesPage />} />
          <Route path=":accessorieId" element={<ProductDetails />} />
        </Route>

        <Route path="/favourites" element={<FavouritesPage />} />

        <Route path="/cart" element={<CartPage />} />

        <Route path="*" element={<NotFoundPage title={NotFound.Page} />} />
      </Route>
    </Routes>
  </HashRouter>
);
