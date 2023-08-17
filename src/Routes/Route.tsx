import {
  Route,
  Routes,
} from 'react-router-dom';

import { HomePage } from '../pages/HomePage';
import { PhonesPage } from '../pages/PhonesPage';
import { CardPage } from '../pages/CardPage';
import { FavoritePage } from '../pages/FavoritePage';
import { CartPage } from '../pages/CartPage';
import { NotFoundPage } from '../pages/NotFoundPage';
// import { useState } from 'react';
// import { Product } from '../types/Product';
// export const [favItems, setFavItems] = useState<Product[]>([]);

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/phones" element={<PhonesPage />} />
      <Route path="/phones/:id" element={<CardPage />} />
      <Route path="/favorites" element={<FavoritePage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
