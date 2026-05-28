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
    {/* Дефолтна сторінка (корінь '/') */}
    <Route path={routes.home} element={<HomePage />} />

    {/* Каталог з параметром категорії */}
    <Route path={routes.catalog} element={<Catalog />} />

    {/* Продукт з категорією і айді */}
    <Route path={routes.product} element={<ItemCard />} />

    <Route path={routes.favorites} element={<Favorites />} />
    <Route path={routes.cart} element={<Cart />} />

    {/* 404 сторінка для всіх інших шляхів */}
    <Route path={routes.notFound} element={<NotFoundPage />} />
  </Routes>
);
