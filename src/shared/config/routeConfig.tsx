import { ProductsPage } from '../../pages/CatalogPage';
import { HomePage } from '../../pages/HomePage';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { RouteProps } from 'react-router-dom';
import { ProductPage } from '../../pages/ProductPage';
import { CartPage } from '../../pages/CartPage';
import { FavoritesPage } from '../../pages/FavoritesPage';

export enum AppRoutes {
  HOME = 'home',
  PRODUCTS = 'products',
  PRODUCT_DETAIL = 'product_detail',
  FAVORITES = 'favorites',
  CART = 'cart',
  NOT_FOUND = 'not_found',
}

export const RoutePaths: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: '/',
  [AppRoutes.PRODUCTS]: '/products/',
  [AppRoutes.PRODUCT_DETAIL]: '/products/',
  [AppRoutes.FAVORITES]: '/favorites',
  [AppRoutes.CART]: '/cart',
  [AppRoutes.NOT_FOUND]: '/not-found',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.HOME]: {
    path: RoutePaths.home,
    element: <HomePage />,
  },
  [AppRoutes.PRODUCTS]: {
    path: `${RoutePaths.products}:category`,
    element: <ProductsPage />,
  },
  [AppRoutes.PRODUCT_DETAIL]: {
    path: `${RoutePaths.product_detail}:category/:itemId`,
    element: <ProductPage />,
  },
  [AppRoutes.FAVORITES]: {
    path: RoutePaths.favorites,
    element: <FavoritesPage />,
  },
  [AppRoutes.CART]: {
    path: RoutePaths.cart,
    element: <CartPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePaths.not_found,
    element: <NotFoundPage />,
  },
};
