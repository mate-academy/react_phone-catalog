import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RouterLayout } from '@/components/layout/RouterLayout';
import { HomePage } from '@/pages/HomePage';
import { CatalogPage } from '@/pages/CatalogPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProductPage } from '@/pages/ProductPage';
import { FavoritesPage } from '@/pages/FavoritesPage';
import { CartPage } from '@/pages/CartPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RouterLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'phones', element: <CatalogPage /> },
      { path: 'tablets', element: <CatalogPage /> },
      { path: 'accessories', element: <CatalogPage /> },
      { path: 'phones/:productId', element: <ProductPage /> },
      { path: 'tablets/:productId', element: <ProductPage /> },
      { path: 'accessories/:productId', element: <ProductPage /> },
      { path: 'favorites', element: <FavoritesPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};
