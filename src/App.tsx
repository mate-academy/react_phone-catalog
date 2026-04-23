import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './modules/shared/components/Layout/Layout';
import { HomePage } from './modules/HomePage';
import { PhonesPage } from './modules/PhonesPage';
import { TabletsPage } from './modules/TabletsPage';
import { AccessoriesPage } from './modules/AccessoriesPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { CartPage } from './modules/CartPage';
import { FavouritesPage } from './modules/FavouritesPage';
import { NotFoundPage } from './modules/NotFoundPage';

export const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="phones" element={<PhonesPage />} />
      <Route path="tablets" element={<TabletsPage />} />
      <Route path="accessories" element={<AccessoriesPage />} />
      <Route path=":category/:productId" element={<ProductDetailsPage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="favourites" element={<FavouritesPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);
