import { createHashRouter, RouterProvider } from 'react-router-dom';
import { NotFoundPage } from './pages/NotFound/NotFoundPage';
import { Layout } from './components/Layout/Layout';
import { HomePage } from './pages/HomePage/HomePage';
import { CatalogPage } from './pages/CatalogPage/CatalogPage';
import { FavoritePage } from './pages/FavoritePage/FavoritePage';
import { CartPage } from './pages/CartPage/CartPage';
import { ItemPage } from './pages/ItemPage/ItemPage';

export const App = () => {
  const router = createHashRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: '/:category',
          element: <CatalogPage />,
        },
        {
          path: '/:category/:itemName',
          element: <ItemPage />,
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
        {
          path: '/404',
          element: <NotFoundPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
