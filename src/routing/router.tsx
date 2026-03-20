import { createBrowserRouter, Navigate } from 'react-router-dom';
import { App } from '../App';
import { HomePage } from '@/modules/HomePage';
import { ErrorMessage } from '@/modules/shared/components/ErrorMessage';
import { CatalogPage } from '@/modules/CatalogPage/CatalogPage';
import { ProductDetailsPage } from '@/modules/ProductDetailsPage';
import { FavoritesPage } from '@/modules/FavoritesPage/FavoritesPage';

export const router = createBrowserRouter(
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
          path: 'product/:productId',
          element: <ProductDetailsPage />,
        },
        {
          path: ':category',
          element: <CatalogPage />,
        },
        {
          path: 'favorites',
          element: <FavoritesPage />,
        },
        {
          path: 'cart',
          element: <div>Cart Page</div>,
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
