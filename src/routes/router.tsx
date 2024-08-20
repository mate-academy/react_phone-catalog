/* eslint-disable max-len */
import { Navigate, createHashRouter } from 'react-router-dom';

import AccessoriesPage from '../modules/AccessoriesPage/AccessoriesPage';
import CartPage from '../modules/CartPage/CartPage';
import FavoritesPage from '../modules/FavoritesPage/FavoritesPage';
import HomePage from '../modules/HomePage/HomePage';
import Layout from '../Layout/Layout';
import NotFoundPage from '../modules/NotFoundPage/NotFoundPage';
import PhonesPage from '../modules/PhonesPage/PhonesPage';
import ProductDetailsPage from '../modules/ProductDetailsPage/ProductDetailsPage';
import { ROUTES } from '../constants/ROUTES';
import TabletsPage from '../modules/TabletsPage/TabletsPage';

export const router = createHashRouter([
  {
    path: ROUTES.HOME,
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'home',
        element: <Navigate to="/" replace />,
      },
      {
        path: ROUTES.PHONES,
        children: [
          { index: true, element: <PhonesPage /> },
          {
            path: ROUTES.PRODUCT_DETAIL,
            element: <ProductDetailsPage />,
          },
        ],
      },
      {
        path: ROUTES.TABLETS,
        children: [
          { index: true, element: <TabletsPage /> },
          {
            path: ROUTES.PRODUCT_DETAIL,
            element: <ProductDetailsPage />,
          },
        ],
      },
      {
        path: ROUTES.ACCESSORIES,
        children: [
          { index: true, element: <AccessoriesPage /> },
          {
            path: ROUTES.PRODUCT_DETAIL,
            element: <ProductDetailsPage />,
          },
        ],
      },
      { path: ROUTES.FAVORITES, element: <FavoritesPage /> },
      { path: ROUTES.CART, element: <CartPage /> },
    ],
  },
]);
