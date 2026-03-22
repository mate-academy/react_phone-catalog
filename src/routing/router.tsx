import {  createHashRouter, Navigate } from 'react-router-dom';
import { App } from '../App';
import { HomePage } from '@/modules/HomePage';
import { ErrorMessage } from '@/modules/shared/components/ErrorMessage';
import { CatalogPage } from '@/modules/CatalogPage/CatalogPage';
import { ProductDetailsPage } from '@/modules/ProductDetailsPage';
import { FavoritesPage } from '@/modules/FavoritesPage/FavoritesPage';
import { CartPage } from '@/modules/CartPage';
import { NotFoundPage } from '@/modules/NotFoundPage';
import { SearchPage } from '@/modules/SearchPage';

export const router = createHashRouter(
  [
    {
      path: '/',
      element: <App />,
      errorElement: <ErrorMessage message="Something went wrong!" />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: 'home',
          element: <Navigate to="/" replace />,
        },
        {
          path: 'search',
          element: <SearchPage />,
        },
        {
          path: 'favorites',
          element: <FavoritesPage />,
        },
        {
          path: 'cart',
          element: <CartPage />,
        },
        {
          path: 'product/:productId',
          element: <ProductDetailsPage />,
        },
        {
          path: ':category',
          element: <CatalogPage />,
        },
        {
          path: '*',
          element: <NotFoundPage />,
        },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  },
);
