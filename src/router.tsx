import { lazy, Suspense } from 'react';

import { createHashRouter } from 'react-router-dom';

import { PageSkeleton } from '@shared/components/PageSkeleton';

import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './modules/home';

const ProductsPage = lazy(() =>
  import('./modules/products').then(module => ({
    default: module.ProductsPage,
  })),
);
const ProductPage = lazy(() =>
  import('./modules/product').then(module => ({
    default: module.ProductPage,
  })),
);
const FavoritesPage = lazy(() =>
  import('./modules/favorites').then(module => ({
    default: module.FavoritesPage,
  })),
);
const CartPage = lazy(() =>
  import('./modules/cart').then(module => ({
    default: module.CartPage,
  })),
);
const ServerError = lazy(() =>
  import('./modules/ServerError').then(module => ({
    default: module.ServerError,
  })),
);
const PageNotFound = lazy(() =>
  import('./modules/PageNotFound').then(module => ({
    default: module.PageNotFound,
  })),
);

export const router = createHashRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/products',
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <ProductsPage />
          </Suspense>
        ),
      },
      {
        path: '/products/:id',
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <ProductPage />
          </Suspense>
        ),
      },
      {
        path: '/favorites',
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <FavoritesPage />
          </Suspense>
        ),
      },
      {
        path: '/cart',
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <CartPage />
          </Suspense>
        ),
      },
      {
        path: '/error',
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <ServerError />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <PageNotFound />
          </Suspense>
        ),
      },
    ],
  },
]);
