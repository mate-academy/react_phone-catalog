import { Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import { HomePage } from '../pages/HomePage/HomePage';
import { Catalog } from '../pages/Catalog';

export const AppRouter = () => (
  <Routes>
    <Route path={routes.home} element={<HomePage />} />
    <Route path={routes.catalog} element={<Catalog />} />
    <Route path={routes.notFound} element={<h1>404</h1>} />
  </Routes>
);
