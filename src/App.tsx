import { Route, Routes } from 'react-router-dom';
import './App.scss';
import './modules/shared/styles/main.scss';
import { MainLayout } from './modules/shared/layouts/MainLayout/MainLayout';
import { HomePage } from './modules/HomePage';
import { CatalogPage } from './modules/CatalogPage/CatalogPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { ItemPage } from './modules/ItemPage';
import { CartPage } from './modules/CartPage';
import { NotFoundPage } from './modules/NotFoundPage';

export const App = () => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />

      <Route path="/catalog/:category" element={<CatalogPage />} />
      <Route path="/product/:productId" element={<ItemPage />} />

      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/cart" element={<CartPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);
