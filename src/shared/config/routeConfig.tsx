import { ProductPage } from '../../pages/CatalogPage';
import { HomePage } from '../../pages/HomePage';
import { RouteProps } from 'react-router-dom';
import { NotFoundPage } from '../../pages/NotFoundPage';

export enum AppRoutes {
  HOME = 'home',
  PRODUCT = 'product',
  // PRODUCT_DETAILS = 'product_details',
  // CART = 'cart',
  // FAVORITES = 'favotites',
  // // last
  NOT_FOUND = 'not_found',
}

export const RoutePaths: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: '/',
  [AppRoutes.PRODUCT]: '/product',
  [AppRoutes.NOT_FOUND]: '*',
  // [AppRoutes.PRODUCT_DETAILS]: 'product/',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.HOME]: {
    path: RoutePaths.home,
    element: <HomePage />,
  },
  [AppRoutes.PRODUCT]: {
    path: RoutePaths.product,
    element: <ProductPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePaths.not_found,
    element: <NotFoundPage />,
  },
};
