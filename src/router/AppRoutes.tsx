import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RouterLayout } from '@/components/layout/RouterLayout';
import { HomePage } from '@/pages/HomePage';

// const HomePage = () => <div>Home Page</div>;
const PhonesPage = () => <div>Phones Catalog</div>;
const TabletsPage = () => <div>Tablets Catalog</div>;
const AccessoriesPage = () => <div>Accessories Catalog</div>;
const FavoritesPage = () => <div>Your Favorites</div>;
const CartPage = () => <div>Shopping Cart</div>;
const NotFoundPage = () => <div>404 - Page Not Found</div>;

const router = createBrowserRouter([
  {
    path: '/',
    element: <RouterLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'phones',
        element: <PhonesPage />,
      },
      {
        path: 'tablets',
        element: <TabletsPage />,
      },
      {
        path: 'accessories',
        element: <AccessoriesPage />,
      },
      {
        path: 'favorites',
        element: <FavoritesPage />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
    ],
  },
]);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};
