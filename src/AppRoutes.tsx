import { Routes, Route, Navigate } from 'react-router-dom';
import { App } from './App';
import { CartPage } from './modules/CartPage/CartPage/CartPage';
import { FavouritesPage } from './modules/FavouritesPage';
import { NotFoundPage } from './modules/NotFoundPage';
import { ProductListPage } from './modules/ProductListPage/ProductListPage';
import { ProductDetails } from './modules/ProductDetailsPage/ProductDetails';
import { HomePage } from './modules/HomePage/HomePage';

const PHONES = 'phones';
const TABLETS = 'tablets';
const ACCESSORIES = 'accessories';

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="home" element={<Navigate to="/" replace />} />
      <Route path="phones/*" element={<ProductListPage category={PHONES} />}>
        <Route path=":itemId" element={<ProductDetails category={PHONES} />} />
      </Route>
      <Route path="tablets/*" element={<ProductListPage category={TABLETS} />}>
        <Route path=":itemId" element={<ProductDetails category={TABLETS} />} />
      </Route>
      <Route
        path="accessories/*"
        element={<ProductListPage category={ACCESSORIES} />}
      >
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
