import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './modules/HomePage';
import { PhonesPage } from './modules/PhonesPage';
import { TabletsPage } from './modules/TabletsPage';
import { AccessoriesPage } from './modules/AccessoriesPage';
import { CartPage } from './modules/CartPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { NotFoundPage } from './modules/NotFoundPage';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'phones', element: <PhonesPage /> },
        { path: 'tablets', element: <TabletsPage /> },
        { path: 'accessories', element: <AccessoriesPage /> },
        { path: 'cart', element: <CartPage /> },
        { path: 'favorites', element: <FavoritesPage /> },
        { path: ':category/:productId', element: <ProductDetailsPage /> },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ],
  {
    basename: '/react_phone-catalog/',
  },
);
