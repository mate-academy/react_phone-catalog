import { Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import { HomePage } from '../pages/HomePage/HomePage';

export const AppRouter = () => (
  <Routes>
    <Route path={routes.home} element={<HomePage />} />
  </Routes>
);
