import { RouteObject } from 'react-router-dom';
import { Cart } from '../pages/Cart';
import { Favorites } from '../pages/Favorites';
import { HomePage } from '../pages/HomePage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { ProductPage } from '../pages/ProductPage';
import { ROUTES } from './routes';
import { NotFoundPage } from '../pages/NotFoundPage';

export const routesConfig: RouteObject[] = [
  { path: ROUTES.home, element: <HomePage /> },
  { path: ROUTES.category, element: <ProductPage /> },
  { path: ROUTES.productDetails, element: <ProductDetailsPage /> },
  { path: ROUTES.favorites, element: <Favorites /> },
  { path: ROUTES.cart, element: <Cart /> },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
