import React from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { CatalogPage } from './pages/CatalogPage/CatalogPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { FavouritePage } from './pages/FavouritesPage/FavouritePage';
import { CartPage } from './pages/CartPage/CartPage';

export const Root: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path=":typeOfProduct" element={<CatalogPage />} />
          <Route
            path=":typeOfProduct/:itemId"
            element={<ProductDetailsPage />}
          />
          <Route path="favourites" element={<FavouritePage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
