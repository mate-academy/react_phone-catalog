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
import { CategoryName } from './libs/types/categoryName.enum';

import './App.scss';

export const App = () => (
  <Routes>
    <Route path="/" element={<Root />}>
      <Route index element={<HomePage />} />
      <Route path={CategoryName.Phones}>
        <Route index element={<ProductsPage />} />
        <Route path=":id" element={<ModelPage />} />
      </Route>
      <Route path={CategoryName.Tablets}>
        <Route index element={<ProductsPage />} />
        <Route path=":id" element={<ModelPage />} />
      </Route>
      <Route path={CategoryName.Accessories}>
        <Route index element={<ProductsPage />} />
        <Route path=":id" element={<ModelPage />} />
      </Route>
      <Route path="favourites" element={<FavouritesPage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);
