import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RouterLayout } from '@/components/layout/RouterLayout';
import { HomePage } from '@/pages/HomePage';
import { CatalogPage } from '@/pages/CatalogPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProductNotFoundPage } from '@/pages/ProductNotFoundPage';

const FavoritesPage = () => <div>Your Favorites</div>;
const CartPage = () => <div>Shopping Cart</div>;
const ProductPage = () => <ProductNotFoundPage />;

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
      { path: 'favorites', element: <FavoritesPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'products/:productId', element: <ProductPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};
