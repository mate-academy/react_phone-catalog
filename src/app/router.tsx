/* eslint-disable max-len */
import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './Layout/Layout';
import { HomePage } from '../modules/HomePage';
import { CategoryPage } from '../modules/CategoryPage';
import { ProductDetailsPage } from '../modules/ProductDetailsPage';
import { FavoritesPage } from '../modules/FavoritesPage';
import { CartPage } from '../modules/CartPage';
import { NotFoundPage } from '../modules/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'phones', element: <CategoryPage type="phones" /> },
      { path: 'tablets', element: <CategoryPage type="tablets" /> },
      { path: 'accessories', element: <CategoryPage type="accessories" /> },
      { path: 'product/:productId', element: <ProductDetailsPage /> },
      { path: 'favorites', element: <FavoritesPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
