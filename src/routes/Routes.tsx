import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { CartPage } from '@pages/CartPage/CartPage';
import { CategoryPage } from '@pages/CategoryPage/CategoryPage';
import { ContactPage } from '@pages/ContactPage/ContactPage';
import { NotFound } from '@pages/ErrorsPage/NotFound';
import { FavouritesPage } from '@pages/FavouritesPage/FavouritesPage';
import { HomePage } from '@pages/HomePage/HomePage';
import { RightsPage } from '@pages/Rights/RightsPage';

import { ProductDetail } from '@components/products/index';

import { ROUTES } from '@utils/constants/routes';

export const AppRoutes: FC = () => (
  <Routes>
    <Route path={ROUTES.HOME}>
      <Route index element={<HomePage />} />

      <Route path={ROUTES.CART} element={<CartPage />} />
      <Route path={ROUTES.FAVOURITES} element={<FavouritesPage />} />

      <Route path={ROUTES.CATEGORY}>
        <Route index element={<CategoryPage />} />
        <Route path={ROUTES.PRODUCT_DETAIL} element={<ProductDetail />} />
      </Route>

      <Route path={ROUTES.CONTACT} element={<ContactPage />} />
      <Route path={ROUTES.RIGHTS} element={<RightsPage />} />
      <Route path={ROUTES.ERROR} element={<NotFound />} />
    </Route>
  </Routes>
);
