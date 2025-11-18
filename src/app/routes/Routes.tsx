import { RouteObject } from 'react-router-dom';
import {
  HomePage,
  NotFoundPage,
  CategoriesPage,
  ProductPage,
  CartPage,
  FavouritesPage,
} from '../../pages';
import { App } from '../App';
import { Category } from '@shared/types';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      ...Object.values(Category).map(cat => ({
        path: cat,
        element: <CategoriesPage category={cat} />,
      })),
      {
        path: 'product/:productId',
        element: <ProductPage />,
      },
      {
        path: 'favourites',
        element: <FavouritesPage />,
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
];
