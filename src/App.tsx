import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useEffect } from 'react';
import './styles/App.scss';

import { useProducts } from './Store';

import { getAllProducts } from './api/getProducts';

import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductPage } from './pages/ProductPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { CartPage } from './pages/CartPage';

import { ErrorPage } from './pages/ErrorPage';

export const App = () => {
  const setProducts = useProducts(state => state.setProducts);

  useEffect(() => {
    getAllProducts().then(setProducts);
  }, []);

  return (
    <div data-cy="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="favourites" element={<FavoritesPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="catalog">
            <Route path=":category" element={<CatalogPage />} />
            <Route path=":category/:product" element={<ProductPage />} />
          </Route>
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};
