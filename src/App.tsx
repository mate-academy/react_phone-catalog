import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import { MainLayout } from './MainLayout';
import { HomePage } from './modules/HomePage';
import { ProductPage } from './modules/ProductPage';
// eslint-disable-next-line max-len
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { CartPage } from './modules/CartPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { NotFoundPage } from './modules/NotFoundPage';

export const App = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to={'/'} replace={true} />} />
        <Route path="phones" element={<ProductPage />} />
        <Route path="tablets" element={<ProductPage />} />
        <Route path="accessories" element={<ProductPage />} />
        <Route path="product/:productId" element={<ProductDetailsPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="favourites" element={<FavoritesPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </HashRouter>
);
