import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ROUTES } from '@utils/constants/routes';

import { AccessoriesPage } from '@pages/accessoriesPage/AccessoriesPage';
import { CartPage } from '@pages/cartPage/CartPage';
import { ContactPage } from '@pages/contactPage/ContactPage';
import { NotFound } from '@pages/errorsPage/NotFound';
import { FavoritePage } from '@pages/favoritePage/FavoritePage';
import { HomePage } from '@pages/homePage/HomePage';
import { PhonePage } from '@pages/phonePage/PhonePage';
import { TabletPage } from '@pages/tabletPage/TabletPage';
import { ProductCard } from '@components/products/products-card/ProductCard';
import { ProductNotFound } from '@pages/errorsPage/ProductNotFound';

export const AppRoutes: FC = () => (
  <Routes>
    <Route path={ROUTES.HOME}>
      <Route index element={<HomePage />} />

      <Route path={ROUTES.CART} element={<CartPage />} />
      <Route path={ROUTES.FAVORITE} element={<FavoritePage />} />

      <Route path={ROUTES.PHONES}>
        <Route index element={<PhonePage />} />
        <Route path={ROUTES.PRODUCT} element={<ProductCard />} />
      </Route>

      <Route path={ROUTES.ACCESSORIES}>
        <Route index element={<AccessoriesPage />} />
        <Route path={ROUTES.PRODUCT} element={<ProductCard />} />
      </Route>

      <Route path={ROUTES.TABLETS}>
        <Route index element={<TabletPage />} />
        <Route path={ROUTES.PRODUCT} element={<ProductCard />} />
      </Route>

      <Route path={ROUTES.CONTACT} element={<ContactPage />} />
      <Route path={ROUTES.ERROR} element={<NotFound />} />
      <Route path={ROUTES.NOTFOUND} element={<ProductNotFound />} />
    </Route>
  </Routes>
);
