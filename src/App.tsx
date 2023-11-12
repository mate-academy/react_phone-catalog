import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import './styles/App.scss';

import { useProducts } from './Store';

import { getAllProducts } from './api/getProducts';

import { Layout } from './components/Layout';
import { Loader } from './components/Loader';

import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductPage } from './pages/ProductPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { CartPage } from './pages/CartPage';

import { ErrorPage } from './pages/ErrorPage';

export const App = () => {
  const setProducts = useProducts(state => state.setProducts);
  const [isLoading, setIsLoading] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setIsLoading(true);
    getAllProducts()
      .then(setProducts)
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    scrollTo(0, 0);
  }, [pathname]);

  return (
    <div data-cy="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          {isLoading ? (
            <Route index element={<Loader />} />
          ) : (
            <>
              <Route index element={<HomePage />} />
              <Route path="home" element={<Navigate to="/" replace />} />
              <Route path="catalog" element={<Navigate to="/" replace />} />
              <Route path="favourites" element={<FavoritesPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="catalog">
                <Route path=":category" element={<CatalogPage />} />
                <Route path=":category/:product" element={<ProductPage />} />
              </Route>
            </>
          )}
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};
