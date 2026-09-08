import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { FavoritesPage } from './components/pages/FavoritesPage';
import { HomePage } from './components/pages/HomePage';
import { NotFoundPage } from './components/pages/NotFoundPage';
import { ShoppingCartPage } from './components/pages/ShoppingCartPage';
import { Phones } from './components/pages/ProductsPage/components/Phohes';
import { Tablets } from './components/pages/ProductsPage/components/Tablets';
// eslint-disable-next-line max-len
import { Accessories } from './components/pages/ProductsPage/components/Accessories';
import { Phone } from './components/pages/ProductPage/components/Phohe';
import { Tablet } from './components/pages/ProductPage/components/Tablet';
import { Accessory } from './components/pages/ProductPage/components/Accessory';

export const Root: React.FC = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />

        <Route path="phones">
          <Route index element={<Phones />} />
          <Route path=":productId" element={<Phone />} />
        </Route>

        <Route path="tablets">
          <Route index element={<Tablets />} />
          <Route path=":productId" element={<Tablet />} />
        </Route>

        <Route path="accessories">
          <Route index element={<Accessories />} />
          <Route path=":productId" element={<Accessory />} />
        </Route>

        <Route path="favorite" element={<FavoritesPage />} />
        <Route path="cart" element={<ShoppingCartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </HashRouter>
);
