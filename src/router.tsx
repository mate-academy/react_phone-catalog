import { createHashRouter } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './modules/HomePage';
import { CartPage } from './modules/CartPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { NotFoundPage } from './modules/NotFoundPage';
import { CategoryPage } from './modules/CategoryPage';

export const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: ':category', element: <CategoryPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'favorites', element: <FavoritesPage /> },
      { path: ':category/:productId', element: <ProductDetailsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
