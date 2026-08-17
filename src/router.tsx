import { createHashRouter, Navigate } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage';
import { CatalogPage } from './modules/CatalogPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { FavoritesPage } from './modules/FavoritesPage/FavoritesPage';
import { CartPage } from './modules/CartPage';
import { NotFoundPage } from './modules/NotFoundPage';

export const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'home',
        element: <Navigate to="/" replace />,
      },
      {
        path: 'favorites',
        element: <FavoritesPage />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
      {
        path: ':category',
        element: <CatalogPage />,
      },
      {
        path: ':category/:itemId',
        element: <ProductDetailsPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
