import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage/HomePage';
import { Phones } from './modules/Phones/Phones';
import { Tablets } from './modules/Tablets/Tablets';
import { Accessories } from './modules/Accessories/Accessories';
import { ShopingCardPage } from './modules/ShoppingCartPage/ShopingCardPage';
import { FavoritePage } from './modules/FavoritePage/FavoritePage';
import { Menu } from './components/Menu/Menu';

export const Root: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="phones" element={<Phones />} />
          <Route path="tablets" element={<Tablets />} />
          <Route path="accessories" element={<Accessories />} />
          <Route path="favorite" element={<FavoritePage />} />
          <Route path="bag" element={<ShopingCardPage />} />
          <Route path="menu" element={<Menu />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
