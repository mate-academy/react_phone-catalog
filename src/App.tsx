import { Route, Routes } from 'react-router-dom';
import {
  HomePage,
  Root,
  NotFoundPage,
  ProductsPage,
  ModelPage,
  FavouritesPage,
  CartPage,
} from './libs/components';

import './App.scss';

export const App = () => (
  <Routes>
    <Route path="/" element={<Root />}>
      <Route index element={<HomePage />} />
      <Route path="phones">
        <Route index element={<ProductsPage />} />
        <Route path="model" element={<ModelPage />} />
      </Route>
      <Route path="favourites" element={<FavouritesPage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);
