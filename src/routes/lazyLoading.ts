import { lazy } from 'react';

export const LazyHomePage = lazy(() =>
  import('../modules/HomePage').then(({ HomePage }) => ({ default: HomePage })),
);

export const LazyProductPage = lazy(() =>
  import('../modules/ProductPage').then(({ ProductPage }) => ({
    default: ProductPage,
  })),
);

export const LazyProductDetailsPage = lazy(() =>
  import('../modules/ProductDetailsPage').then(({ ProductDetailsPage }) => ({
    default: ProductDetailsPage,
  })),
);

export const LazyShoppingCartPage = lazy(() =>
  import('../modules/ShoppingCartPage').then(({ ShoppingCartPage }) => ({
    default: ShoppingCartPage,
  })),
);

export const LazyFavoritesPage = lazy(() =>
  import('../modules/FavoritesPage').then(({ FavoritesPage }) => ({
    default: FavoritesPage,
  })),
);

export const LazyNotFoundPage = lazy(() =>
  import('../modules/NotFoundPage').then(({ NotFoundPage }) => ({
    default: NotFoundPage,
  })),
);
