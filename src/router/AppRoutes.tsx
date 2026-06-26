import { createHashRouter, Params, RouterProvider } from 'react-router-dom';
import { App } from '../App';
import { HomePage } from '../modules/home';
import { CatalogPage } from '../modules/catalog';
import { ProductDetailsPage } from '../modules/product-details';
import { CartPage } from '../modules/cart';
import { FavoritesPage } from '../modules/favorites';
import { ReactNode } from 'react';
import { NotFoundPage } from '../modules/not-found';
import { getAccessories, getPhones, getTablets } from '../services/product.api';

interface Product {
  id: string;
  name: string;
}

interface RouterError extends Error {
  status?: number;
}

export interface CrumbHandle<T = unknown> {
  crumb: (params: Params, data?: T) => ReactNode;
  linkTo?: string | ((params: Params) => string);
}

const productLoader = async ({
  params,
}: {
  params: Params;
}): Promise<Product> => {
  const { category, productId } = params;
  let products: Product[] = [];

  switch (category) {
    case 'phones':
      products = await getPhones();
      break;
    case 'tablets':
      products = await getTablets();
      break;
    case 'accessories':
      products = await getAccessories();
      break;
    default:
      const error = new Error('Category Not Found') as RouterError;

      error.status = 404;
      throw error;
  }

  const currentProduct = products.find(product => product.id === productId);

  if (!currentProduct) {
    const error = new Error('Product Not Found') as RouterError;

    error.status = 404;
    throw error;
  }

  return currentProduct;
};

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },

      {
        path: ':category',
        handle: {
          crumb: (params: Params) => params.category,
          linkTo: (params: Params) => `/${params.category}`,
        } as CrumbHandle,
        children: [
          {
            index: true,
            element: <CatalogPage />,
          },
          {
            path: 'product/:productId',
            element: <ProductDetailsPage />,
            loader: productLoader,
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
