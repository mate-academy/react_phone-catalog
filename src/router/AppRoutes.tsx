import { createHashRouter, RouterProvider } from 'react-router-dom';
import { RouterLayout } from '@/components/layout/RouterLayout';
import { HomePage } from '@/pages/HomePage';
import { CatalogPage } from '@/pages/CatalogPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProductPage } from '@/pages/ProductPage';
import { FavoritesPage } from '@/pages/FavoritesPage';
import { CartPage } from '@/pages/CartPage';
import { ProductNotFoundPage } from '@/pages/ProductNotFoundPage';
import { queryClient } from '@/providers/QueryProvider';
import { fetchAllProducts } from '@/api/products';
import { fetchPhoneDetails } from '@/api/phoneDetails';
import { fetchTabletDetails } from '@/api/tabletDetails';
import { QUERY_KEYS } from '@/api/queryKeys';
import { fetchAccessoriesDetails } from '@/api/accessoriesDetails';
import { RightsPage } from '@/pages/RightsPage';
// const basename = import.meta.env.DEV ? '/' : '/react_phone-catalog/';

const prefetchAll = () =>
  Promise.all([
    queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.products,
      queryFn: fetchAllProducts,
    }),
    queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.phones,
      queryFn: fetchPhoneDetails,
    }),
    queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.tablets,
      queryFn: fetchTabletDetails,
    }),
    queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.accessories,
      queryFn: fetchAccessoriesDetails,
    }),
  ]);

const router = createHashRouter(
  [
    {
      path: '/',
      element: <RouterLayout />,
      loader: prefetchAll,
      errorElement: <NotFoundPage />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'phones', element: <CatalogPage /> },
        { path: 'tablets', element: <CatalogPage /> },
        {
          path: 'accessories',
          element: <CatalogPage />,
        },
        { path: 'phones/:productId', element: <ProductPage /> },
        { path: 'tablets/:productId', element: <ProductPage /> },
        { path: 'accessories/:productId', element: <ProductPage /> },
        { path: 'product-not-found', element: <ProductNotFoundPage /> },
        { path: 'favorites', element: <FavoritesPage /> },
        { path: 'cart', element: <CartPage /> },
        { path: 'rights', element: <RightsPage /> },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ],
  // {
  //   basename: basename,
  // },
);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};
