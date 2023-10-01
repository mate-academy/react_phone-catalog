import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './styles/App.scss';

import { ProductProvider } from './ProductContext';

import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { CartPage } from './pages/CartPage';

import { ErrorPage } from './pages/ErrorPage';

export const App = () => {
  return (
    <div data-cy="app">
      <ProductProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="favourites" element={<FavoritesPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="catalog">
              <Route path=":product" element={<CatalogPage />} />
              <Route path=":product" element={<CatalogPage />} />
              <Route path=":product" element={<CatalogPage />} />
            </Route>
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </ProductProvider>
    </div>
  );
};
