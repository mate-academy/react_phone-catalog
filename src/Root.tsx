import React from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './components/HomePage';
import { PhonesPage } from './components/PhonesPage/PhonesPage';
import { ItemCard, ProductType } from './components/ItemCard';
import { TabletsPage } from './components/TabletsPage/TabletsPage';
import { AccessoriesPage } from './components/AccessoriesPage/AccessoriesPage';
import { FavouritesPage } from './components/FavouritesPage/FavouritesPage';
import { CartPage } from './components/CartPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="phones" element={<PhonesPage />} />
        <Route
          path="phones/:id"
          element={<ItemCard type={ProductType.PHONE} />}
        />

        <Route path="tablets" element={<TabletsPage />} />
        <Route
          path="tablets/:id"
          element={<ItemCard type={ProductType.TABLET} />}
        />

        <Route path="accessories" element={<AccessoriesPage />} />
        <Route
          path="accessories/:id"
          element={<ItemCard type={ProductType.ACCESSORIES} />}
        />
        <Route path="favourites" element={<FavouritesPage />} />
        <Route path="cart" element={<CartPage />} />

        <Route path="*" element={<h1 className="title">Page not found</h1>} />
      </Route>
    </Routes>
  </Router>
);
