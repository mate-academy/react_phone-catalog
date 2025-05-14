import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Header } from './components/Header';
import { Home as HomePage } from './pages/Home';
import { Catalog as CatalogPage } from './pages/Catalog';
import { Favorites as FavoritesPage } from './pages/Favorites';
import { Cart as CartPage } from './pages/Cart';
import { NotFound404 as NotFound404Page } from './pages/NotFound404';
import { Footer } from './components/Footer';

import './App.scss';

export const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="home" element={<Navigate to=".." />} />
          <Route path="*" element={<NotFound404Page />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
};
