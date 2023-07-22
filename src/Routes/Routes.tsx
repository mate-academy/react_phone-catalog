import {
  Route,
  Routes,
} from 'react-router-dom';

import { HomePage } from '../Pages/HomePage';
import { CatalogPage } from '../Pages/CatalogPage';
import { CardPage } from '../Pages/CardPage';
import { CartPage } from '../Pages/CartPage';
import { NotFoundPage } from '../Pages/NotFoundPage';

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="categories/:category" element={<CatalogPage />} />
    <Route path="categories/:category/:id" element={<CardPage />} />
    <Route path="/cart" element={<CartPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);
