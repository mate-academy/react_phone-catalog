import {
  createHashRouter,
  // HashRouter,
  Params,
  // Route,
  RouterProvider,
  // Routes,
} from 'react-router-dom';
import { App } from '../App';
import { HomePage } from '../modules/home';
import { CatalogPage } from '../modules/catalog';
import { ProductDetailsPage } from '../modules/product-details';
import { CartPage } from '../modules/cart';
import { FavoritesPage } from '../modules/favorites';
import { ReactNode } from 'react';
import { NotFoundPage } from '../modules/not-found';

interface Product {
  id: string;
  name: string;
}
export interface CrumbHandle<T = unknown> {
  crumb: (params: Params, data?: T) => ReactNode;
}

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },

      {
        path: ':category',
        element: null,
        children: [
          {
            index: true,
            element: <CatalogPage />,
            handle: { crumb: params => params.category } as CrumbHandle,
          },
          {
            path: 'product/:productId',
            element: <ProductDetailsPage />,
            handle: {
              crumb: (_params, product: Product) => product?.name || 'Product',
            } as CrumbHandle<Product>,
          },
        ],
      },

      {
        path: 'cart',
        element: <CartPage />,
        handle: { crumb: () => 'Cart' } as CrumbHandle,
      },

      {
        path: 'favorites',
        element: <FavoritesPage />,
        handle: { crumb: () => 'Favorites' } as CrumbHandle,
      },

      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};
