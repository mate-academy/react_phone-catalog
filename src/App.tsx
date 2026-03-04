import './App.scss';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from './modules/shared/components/AppLayout';
import { HomePage } from './modules/Home/HomePage';
import { CatalogPage } from './modules/Catalog';
import { ProductDetailsPage } from './modules/ProductDetails';
import { CartPage } from './modules/Cart';
import { FavoritesPage } from './modules/Favorites';
import { NotFoundPage } from './modules/NotFound';

export const App = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="phones" element={<CatalogPage />} />
        <Route path="tablets" element={<CatalogPage />} />
        <Route path="accessories" element={<CatalogPage />} />
        <Route path="product/:productId" element={<ProductDetailsPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </HashRouter>
);
