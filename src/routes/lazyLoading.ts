import { lazy } from 'react';

export const LazyHomePage = lazy(() =>
  import('../pages/HomePage').then(({ HomePage }) => ({ default: HomePage })),
);

export const LazyProductPage = lazy(() =>
  import('../pages/ProductPage').then(({ ProductPage }) => ({
    default: ProductPage,
  })),
);

export const LazyProductDetailsPage = lazy(() =>
  import('../pages/ProductDetailsPage').then(({ ProductDetailsPage }) => ({
    default: ProductDetailsPage,
  })),
);

export const LazyShoppingCartPage = lazy(() =>
  import('../pages/ShoppingCartPage').then(({ ShoppingCartPage }) => ({
    default: ShoppingCartPage,
  })),
);

export const LazyFavoritesPage = lazy(() =>
  import('../pages/FavoritesPage').then(({ FavoritesPage }) => ({
    default: FavoritesPage,
  })),
);

export const LazyNotFoundPage = lazy(() =>
  import('../pages/NotFoundPage').then(({ NotFoundPage }) => ({
    default: NotFoundPage,
  })),
);
