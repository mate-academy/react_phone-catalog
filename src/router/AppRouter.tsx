import { createHashRouter } from 'react-router-dom';
import { App } from '../App';
import { HomePage } from '../pages/HomePage/HomePage';
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage';
import { PhonesPage } from '../pages/PhonesPage';
import { TabletsPage } from '../pages/TabletsPage';
import { AccessoriesPage } from '../pages/AccessoriesPage';
import { FavoritesPage } from '../pages/FavoritesPage';
import { CartPage } from '../pages/CartPage';

export const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'phones', element: <PhonesPage /> },
      { path: 'phones/:id', element: <PhonesPage /> },
      { path: 'tablets', element: <TabletsPage /> },
      { path: 'tablets/:id', element: <TabletsPage /> },
      { path: 'accessories', element: <AccessoriesPage /> },
      { path: 'accessories/:id', element: <AccessoriesPage /> },
      { path: 'favorites', element: <FavoritesPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
