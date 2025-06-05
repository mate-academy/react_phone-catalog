/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';

import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';

import { App } from './App';
import { CartPage } from './modules/CartPage/CartPage';
import { ContactsPage } from './modules/ContactsPage/ContactsPage';
import { FavoritesPage } from './modules/FavoritesPage/FavoritesPage';
import { HomePage } from './modules/HomePage/HomePage';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage/ProductDetailsPage';
import { ProductsPage } from './modules/ProductsPage';

export const Root: React.FC = () => (
  <Router>
    <Routes>
      <Route element={<App />} path="/">
        <Route index element={<HomePage />} />
        <Route element={<Navigate replace to="/" />} path="home" />

        <Route element={<ProductsPage />} path=":category" />
        <Route element={<ProductDetailsPage />} path=":category/:id" />

        <Route element={<FavoritesPage />} path="favorites" />
        <Route element={<CartPage />} path="cart" />

        <Route element={<ContactsPage />} path="contacts" />

        <Route element={<NotFoundPage />} path="*" />
      </Route>
    </Routes>
  </Router>
);
