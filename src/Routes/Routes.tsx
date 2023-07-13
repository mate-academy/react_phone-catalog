import {
  createBrowserRouter,
} from 'react-router-dom';

import { Home } from '../Pages/Home';
import { CatalogPage } from '../Pages/CatalogPage';
import { CardPage } from '../components/cardPage/CardPage';

export const appRoutes = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: ':category',
    element: <CatalogPage />,
  },
  {
    path: '/phones/:id',
    element: <CardPage />,
  },
]);
