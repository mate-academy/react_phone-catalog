import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { CatalogPage } from './pages/CardsPage/CatalogPage';
import HomePage from './pages/HomePage/HomePage';

import DefaultLayout from './layouts/default';
import { ProductDetailsCard } from './pages/ProductDetailsPage/ProductDetailsCard';
import { FavouritesPage } from './pages/Favourites/FavouritesPage';
import CartPage from './pages/CartPage/CartPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />

        <Route path="/:category/:productId" element={<ProductDetailsCard />} />

        <Route path="phones">
          <Route
            index
            element={<CatalogPage title="Mobile phones" category="phones" />}
          />
        </Route>

        <Route path="tablets">
          <Route
            index
            element={<CatalogPage title="Tablets" category="tablets" />}
          />
        </Route>

        <Route path="accessories">
          <Route
            index
            element={<CatalogPage title="Accessories" category="accessories" />}
          />
        </Route>

        <Route path="favourites">
          <Route index element={<FavouritesPage />} />
        </Route>

        <Route path="cart">
          <Route index element={<CartPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
