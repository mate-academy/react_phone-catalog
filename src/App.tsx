import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { NotFoundPage } from './pages/NotFound/NotFoundPage';
import { Layout } from './components/Layout/Layout';
import { HomePage } from './pages/HomePage/HomePage';
import { CatalogPage } from './pages/CatalogPage/CatalogPage';
import { FavoritePage } from './pages/FavoritePage/FavoritePage';
import { CartPage } from './pages/CartPage/CartPage';

export const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: 'catalog',
          element: <CatalogPage />,
        },
        {
          path: 'favorites',
          element: <FavoritePage />,
        },
        {
          path: 'cart',
          element: <CartPage />,
        },
        {
          path: '*',
          element: <NotFoundPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
