import {
  Route,
  Routes,
} from 'react-router-dom';

import { HomePage } from '../Pages/HomePage';
import { CatalogPage } from '../Pages/CatalogPage';
import { CardPage } from '../Pages/CardPage';
import { CartPage } from '../Pages/CartPage';

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path=":category" element={<CatalogPage />} />
    <Route path="/:category/:id" element={<CardPage />} />
    <Route path="/cart" element={<CartPage />} />
  </Routes>
);
