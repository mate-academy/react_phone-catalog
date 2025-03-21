import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './modules/HomePage/HomePage';
import { App } from './App';
import { Phones } from './modules/PhonePage/PhonesPage';
import { Tablets } from './modules/TabletsPage/TabletsPage';
import { Accessories } from './modules/AccessoriesPage/AccessoriesPage';
import { CartPage } from './modules/CartPage/CartPage';
import { CartProvider } from './hooks/useCart';
import { FavoritePage } from './modules/FavouritePage/FavouritePage';
import { Menu } from './components/Menu/Menu';
import { ProductDetailsPage } from './modules/ProductDetailsPage/ProductDetailsPage';

export const Root: React.FC = () => {
  return (
    <CartProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="phones" element={<Phones />} />
            <Route path="phones/:phoneId" element={<ProductDetailsPage />} />
            <Route path="tablets" element={<Tablets />} />
            <Route path="tablets/:phoneId" element={<ProductDetailsPage />} />
            <Route path="accessories" element={<Accessories />} />
            <Route path="accessories/:phoneId" element={<ProductDetailsPage />} />
            <Route path="bag" element={<CartPage />} />
            <Route path="favourite" element={<FavoritePage />} />
            <Route path="menu" element={<Menu />} />
          </Route>
        </Routes>
      </HashRouter>
    </CartProvider>
  );
};
