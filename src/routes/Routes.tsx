import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ROUTES } from 'utils/constants/routes';

import { HomePage } from 'pages/homePage/HomePage';
import { CartPage } from 'pages/cartPage/CartPage';
import { FavoritePage } from 'pages/favoritePage/FavoritePage';
import { PhonePage } from 'pages/phonePage/PhonePage';
import { AccessoriesPage } from 'pages/accessoriesPage/AccessoriesPage';
import { TabletPage } from 'pages/tabletPage/TabletPage';
import { ContactPage } from 'pages/contactPage/ContactPage';
import { ErrorPage } from 'pages/errorPage/ErrorPage';

export const AppRoutes: FC = () => (
  <Routes>
    <Route index element={<HomePage />} />
    <Route path={ROUTES.CART} element={<CartPage />} />
    <Route path={ROUTES.FAVORITE} element={<FavoritePage />} />
    <Route path={ROUTES.CONTACT} element={<ContactPage />} />
    <Route path={ROUTES.TABLETS} element={<TabletPage />} />
    <Route path={ROUTES.PHONES} element={<PhonePage />} />
    <Route path={ROUTES.ACCESSORIES} element={<AccessoriesPage />} />
    <Route path={ROUTES.ERROR} element={<ErrorPage />} />
  </Routes>
);
