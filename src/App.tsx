import {
  Routes, Route, Navigate,
} from 'react-router-dom';

import './App.scss';
import React from 'react';
import { HomePage } from './pages/HomePage/HomePage';
import { PhonesPage } from './pages/PhonesPage/PhonesPage';
import { TabletsPage } from './pages/TabletsPage/TabletsPage';
import {
  ProductDetailsPage,
} from './pages/ProductDetailsPage/ProductDetailsPage';
import { FavouritesPage } from './pages/FavouritesPage/FavouritesPage';
import { LikeAndCartProvider } from './helpers/LikeAndCartContext';
import { CartPage } from './pages/CartPage/CartPage';
import { AccessoriesPage } from './pages/AccessoriesPage/AccessoriesPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';

const App: React.FC = () => {
  return (
    <div className="App">
      <LikeAndCartProvider>
        <Routes>
          <Route path="/">
            <Route index element={<HomePage />} />
            <Route path="home" element={<Navigate to="/" replace />} />

            <Route path="phones">
              <Route index element={<PhonesPage />} />
              <Route
                path=":productId"
                element={<ProductDetailsPage />}
              />
            </Route>

            <Route path="tablets">
              <Route index element={<TabletsPage />} />
              <Route
                path=":productId"
                element={<ProductDetailsPage />}
              />
            </Route>

            <Route path="accessories">
              <Route index element={<AccessoriesPage />} />
              <Route
                path=":productId"
                element={<ProductDetailsPage />}
              />
            </Route>

            <Route path="favourites">
              <Route index element={<FavouritesPage />} />
            </Route>

            <Route path="shopping-bag">
              <Route index element={<CartPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </LikeAndCartProvider>
    </div>
  );
};

export default App;
