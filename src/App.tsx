/* eslint-disable max-len */
import './App.css';

import { RouterProvider, createHashRouter } from 'react-router-dom';

import Layout from './Layout/Layout';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import { ROUTES } from './constants/ROUTES';
import AccessoriesPage from './modules/AccessoriesPage/PhonesPage';
import CartPage from './modules/CartPage/CartPage';
import FavoritesPage from './modules/FavoritesPage/FavoritesPage';
import HomePage from './modules/HomePage/HomePage';
import PhonesPage from './modules/PhonesPage/PhonesPage';
import ProductDetailsPage from './modules/ProductDetailsPage/ProductDetailsPage';
import TabletsPage from './modules/TabletsPage/TabletsPage';

const router = createHashRouter([
  {
    path: ROUTES.HOME,
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: ROUTES.PHONES,
        children: [
          { index: true, element: <PhonesPage /> },
          { path: ROUTES.PRODUCT_DETAIL, element: <ProductDetailsPage /> },
        ],
      },
      {
        path: ROUTES.TABLETS,
        children: [
          { index: true, element: <TabletsPage /> },
          { path: ROUTES.PRODUCT_DETAIL, element: <ProductDetailsPage /> },
        ],
      },
      {
        path: ROUTES.ACCESSORIES,
        children: [
          { index: true, element: <AccessoriesPage /> },
          { path: ROUTES.PRODUCT_DETAIL, element: <ProductDetailsPage /> },
        ],
      },
      { path: ROUTES.FAVORITES, element: <FavoritesPage /> },
      { path: ROUTES.CART, element: <CartPage /> },
    ],
  },
]);

export const App = () => <RouterProvider router={router} />;
