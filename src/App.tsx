/* eslint-disable max-len */
import './App.css';

import { Navigate, RouterProvider, createHashRouter } from 'react-router-dom';

import AccessoriesPage from './modules/AccessoriesPage/PhonesPage';
import CartPage from './modules/CartPage/CartPage';
import FavoritesPage from './modules/FavoritesPage/FavoritesPage';
import HomePage from './modules/HomePage/HomePage';
import Layout from './Layout/Layout';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import PhonesPage from './modules/PhonesPage/PhonesPage';
import ProductDetailsPage from './modules/ProductDetailsPage/ProductDetailsPage';
import { ROUTES } from './constants/ROUTES';
import TabletsPage from './modules/TabletsPage/TabletsPage';

const productDetailRoute = {
  path: ROUTES.PRODUCT_DETAIL,
  element: <ProductDetailsPage />,
};

const router = createHashRouter([
  {
    path: ROUTES.HOME,
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ROUTES.HOME,
        element: <Navigate to="/" />,
      },
      {
        path: ROUTES.PHONES,
        children: [
          {
            index: true,
            element: <PhonesPage />,
          },
          productDetailRoute,
        ],
      },
      {
        path: ROUTES.TABLETS,
        children: [
          {
            index: true,
            element: <TabletsPage />,
          },
          productDetailRoute,
        ],
      },
      {
        path: ROUTES.ACCESSORIES,
        children: [
          {
            index: true,
            element: <AccessoriesPage />,
          },
          productDetailRoute,
        ],
      },
      {
        path: ROUTES.FAVORITES,
        element: <FavoritesPage />,
      },
      {
        path: ROUTES.CART,
        element: <CartPage />,
      },
    ],
  },
]);

export const App = () => <RouterProvider router={router} />;
