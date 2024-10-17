import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ROUTES } from '@utils/constants/routes';

import { ProductDetail } from '@components/products/product-detail/ProductDetail';
import { HomePage } from '@pages/HomePage/HomePage';
import { CartPage } from '@pages/CartPage/CartPage';
import { FavouritesPage } from '@pages/FavouritesPage/FavouritesPage';
import { CategoryPage } from '@pages/CategoryPage/CategoryPage';
import { ContactPage } from '@pages/ContactPage/ContactPage';
import { RightsPage } from '@pages/Rights/RightsPage';
import { ProductNotFound } from '@pages/ErrorsPage/ProductNotFound';
import { NotFound } from '@pages/ErrorsPage/NotFound';

export const AppRoutes: FC = () => (
  <Routes>
    <Route path={ROUTES.HOME}>
      <Route index element={<HomePage />} />

      <Route path={ROUTES.CART} element={<CartPage />} />
      <Route path={ROUTES.FAVOURITES} element={<FavouritesPage />} />

      <Route path={ROUTES.CATEGORIES}>
        <Route path={ROUTES.CATEGORY}>
          <Route index element={<CategoryPage />} />
          <Route path={ROUTES.PRODUCT_DETAIL} element={<ProductDetail />} />
        </Route>
      </Route>

      <Route path={ROUTES.CONTACT} element={<ContactPage />} />
      <Route path={ROUTES.RIGHTS} element={<RightsPage />} />
      <Route path={ROUTES.NOTFOUND} element={<ProductNotFound />} />
      <Route path={ROUTES.ERROR} element={<NotFound />} />
    </Route>
  </Routes>
);
