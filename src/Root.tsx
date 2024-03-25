import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import React from 'react';
import './App.scss';
import { AccessoriesPage } from './components/AccesoriesPage';
import { HomePage } from './components/HomePage';
import { PhonesPage } from './components/PhonesPage';
import { TabletsPage } from './components/TabletsPage';
import { App } from './App';
import { GlobalStateProvider } from './store/ProductsContext';
import { ProductDetailsPage } from './components/ProductDetailsPage';
import { FavouritesPage } from './components/FavouritesPage';
import { CartPage } from './components/CartPage';
import { NotFoundPage } from './components/NotFoundPage';

export const Root: React.FC = () => (
  <Router>
    <GlobalStateProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="*" element={<NotFoundPage />} />
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="phones">
            <Route index element={<PhonesPage />} />
            <Route path=":productId" element={<ProductDetailsPage />} />
          </Route>
          <Route path="favourites">
            <Route index element={<FavouritesPage />} />
            <Route path=":productId" element={<ProductDetailsPage />} />
          </Route>
          <Route path="cart">
            <Route index element={<CartPage />} />
            <Route path=":productId" element={<ProductDetailsPage />} />
          </Route>
          <Route path="tablets">
            <Route index element={<TabletsPage />} />
            <Route path=":productId" element={<ProductDetailsPage />} />
          </Route>
          <Route path="accessories">
            <Route index element={<AccessoriesPage />} />
            <Route path=":productId" element={<ProductDetailsPage />} />
          </Route>
        </Route>
      </Routes>
    </GlobalStateProvider>
  </Router>
);
