import { Route, Routes, Navigate } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './moduls/HomePage';
import { PhonesPage } from './moduls/PhonesPage';
import { TabletsPage } from './moduls/TabletsPage';
import { AccessoriesPage } from './moduls/AccessoriesPage';
import { CartPage } from './moduls/CartPage';
import { FavouritesPage } from './moduls/FavouritesPage';
import { ProductPage } from './moduls/ProductPage';

export const Root = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="home" element={<Navigate to="/" replace />} />
      <Route path="phones">
        <Route index element={<PhonesPage />} />
        <Route path=":slug" element={<ProductPage />} />
      </Route>
      <Route path="tablets">
        <Route index element={<TabletsPage />} />
        <Route path=":slug" element={<ProductPage />} />
      </Route>
      <Route path="accessories">
        <Route index element={<AccessoriesPage />} />
        <Route path=":slug" element={<ProductPage />} />
      </Route>
      <Route path="favourites" element={<FavouritesPage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="*" element={<p>Page not found</p>} />
    </Route>
  </Routes>
);
