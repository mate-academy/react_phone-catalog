import { Navigate, Route, Routes } from 'react-router-dom';
import { App } from '../App';
import { PageNotFound } from '../modules/PageNotFound/PageNotFound';
import { HomePage } from '../modules/HomePage/HomePage';

import { PhonesPage } from '../modules/PhonesPage/PhonesPage';
import { TabletsPage } from '../modules/TabletsPage/TabletsPage';
import { AccessoriesPage } from '../modules/AccessoriesPage/AccessoriesPage';
import { CartPage } from '../modules/CartPage/CartPage';
import { FavoritesPage } from '../modules/FavoritesPage/FavoritesPage';
// eslint-disable-next-line max-len
import { ProductDetailsPage } from '../modules/ProductDetailsPage/ProductDetailsPage';

export const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route
          path="*"
          element={
            location.hash.includes('#menu') ? (
              <Navigate to="/" replace />
            ) : (
              <PageNotFound />
            )
          }
        />
        <Route path="phones">
          <Route index element={<PhonesPage />} />
          <Route path=":productId" element={<ProductDetailsPage />} />
          <Route path=":filterId?/phones">
            <Route index element={<PhonesPage />} />
          </Route>

          <Route path=":slug?" />
        </Route>

        <Route path="tablets">
          <Route index element={<TabletsPage />} />
          <Route path=":productId" element={<ProductDetailsPage />} />
          <Route path=":filterId?/tablets">
            <Route index element={<TabletsPage />} />
          </Route>

          <Route path=":slug?" />
        </Route>

        <Route path="accessories">
          <Route index element={<AccessoriesPage />} />
          <Route path=":productId" element={<ProductDetailsPage />} />
          <Route path=":filterId?/accessories">
            <Route index element={<AccessoriesPage />} />
          </Route>
          <Route path=":slug?" />
        </Route>
      </Route>
    </Routes>
  );
};
