/* eslint-disable max-len */
import { Navigate, Route, Routes } from 'react-router-dom';

import { App } from './App';
import { HomePage } from './modules/HomePage/HomePage';
import { ProductListPage } from './modules/ProductListPage/ProductListPage';
import { FavouritesPage } from './modules/FavouritesPage/FavouritesPage';
import { CartPage } from './modules/CartPage/CartPage';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';
import { ProductDetails } from './modules/ProductDetailsPage/ProductDetails/ProductDetails';

const PHONES = 'phones';
const TABLETS = 'tablets';
const ACCESSORIES = 'accessories';

export const Root = () => (
  <Routes
    future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    }}
  >
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="home" element={<Navigate to="/" replace />} />

      <Route path="phones">
        <Route index element={<ProductListPage category={PHONES} />} />
        <Route path=":itemId" element={<ProductDetails category={PHONES} />} />
      </Route>

      <Route path="tablets">
        <Route index element={<ProductListPage category={TABLETS} />} />
        <Route path=":itemId" element={<ProductDetails category={TABLETS} />} />
      </Route>

      <Route path="accessories">
        <Route index element={<ProductListPage category={ACCESSORIES} />} />
        <Route
          path=":itemId"
          element={<ProductDetails category={ACCESSORIES} />}
        />
      </Route>

      <Route path="favourites" element={<FavouritesPage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);
