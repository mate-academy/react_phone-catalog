import { Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import { HomePage } from '../pages/HomePage/HomePage';
import { Catalog } from '../pages/Catalog';
import { ItemCard } from '../pages/ItemCard';
import { Favorites } from '../pages/Favorites';
import { Cart } from '../pages/Cart';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';

export const AppRouter = () => (
  <Routes>
    <Route path={routes.home} element={<HomePage />} />
    <Route path={routes.catalog} element={<Catalog />} />
    <Route path={routes.product} element={<ItemCard />} />
    <Route path={routes.favorites} element={<Favorites />} />
    <Route path={routes.cart} element={<Cart />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);
