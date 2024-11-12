import { createHashRouter } from 'react-router-dom';

import { MainLayout } from './layouts/MainLayout';
import { CartPage } from './modules/cart';
import { FavoritesPage } from './modules/favorites';
import { HomePage } from './modules/home';
import { ProductPage } from './modules/product';
import { ProductsPage } from './modules/products';

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
        element: <ProductsPage />,
      },
      {
        path: '/products/:id',
        element: <ProductPage />,
      },
      {
        path: '/favorites',
        element: <FavoritesPage />,
      },
      {
        path: '/cart',
        element: <CartPage />,
      },
    ],
  },
]);
