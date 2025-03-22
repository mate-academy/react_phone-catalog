import { Route, Routes, Navigate } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './moduls/HomePage';
import { PhonesPage } from './moduls/PhonesPage';
import { TabletsPage } from './moduls/TabletsPage';
import { AccessoriesPage } from './moduls/AccessoriesPage';
import { CartPage } from './moduls/CartPage';
import { FavouritesPage } from './moduls/FavouritesPage';
import { ProductDetailsPage } from './moduls/ProductDetailsPage';
import { PageNotFound } from './moduls/PageNotFound';
import { SearchPage } from './moduls/SearchPage';

export const Root = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />

      <Route path="home" element={<Navigate to="/" replace />} />
      <Route path="phones" element={<PhonesPage />} />
      <Route path="tablets" element={<TabletsPage />} />
      <Route path="accessories" element={<AccessoriesPage />} />

      <Route path=':category'>
        <Route path=':productId' element={<ProductDetailsPage />} />
      </Route>

      <Route path="favourites" element={<FavouritesPage />} />
      <Route path="cart" element={<CartPage />} />

      <Route path='search'>
        <Route path='?:query' element={<SearchPage />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Route>
  </Routes>
);
