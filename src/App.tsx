import { Route, Routes } from 'react-router-dom';
import { ProductCategory } from './libs/types/ProductCategory.enum';

import {
  Root,
  NotFoundPage,
} from './libs/components';
import {
  HomePage,
  ProductsPage,
  ProductDetailsPage,
  FavouritesPage,
  CartPage,
} from './libs/pages';

import './App.scss';

export const App = () => (
  <Routes>
    <Route path="/" element={<Root />}>
      <Route index element={<HomePage />} />
      <Route path={ProductCategory.Phones}>
        <Route index element={<ProductsPage title="Mobile phones" />} />
        <Route path=":id" element={<ProductDetailsPage />} />
      </Route>
      <Route path={ProductCategory.Tablets}>
        <Route index element={<ProductsPage />} />
        <Route path=":id" element={<ProductDetailsPage />} />
      </Route>
      <Route path={ProductCategory.Accessories}>
        <Route index element={<ProductsPage />} />
        <Route path=":id" element={<ProductDetailsPage />} />
      </Route>
      <Route path="favourites" element={<FavouritesPage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);
