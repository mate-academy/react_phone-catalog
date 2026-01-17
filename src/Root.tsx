import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { App } from './App';
import { MainPage } from './pages/MainPage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { CardItem } from './components/CardItem';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { CartPage } from './pages/CartPage';
export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<MainPage />} />
          <Route path="phones">
            <Route index element={<PhonesPage />} />
            <Route path="phones/:id?" element={<CardItem />} />
          </Route>
          <Route path="tablets" element={<TabletsPage />} />
          <Route path="accessories" element={<AccessoriesPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="*" element={<MainPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
