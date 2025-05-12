import { lazy } from 'react';

export const HomePageLazy = lazy(() =>
  import('../modules/HomePage').then(({ HomePage }) => ({
    default: HomePage,
  })),
);

export const ProductPageLazy = lazy(() =>
  import('../modules/ProductPage').then(({ ProductPage }) => ({
    default: ProductPage,
  })),
);

export const ProductDetailsPageLazy = lazy(() =>
  import('../modules/ProductDetailsPage').then(({ ProductDetailsPage }) => ({
    default: ProductDetailsPage,
  })),
);

export const FavouritesPageLazy = lazy(async () => {
  const { FavouritesPage } = await import('../modules/FavouritesPage');

  return { default: FavouritesPage };
});

export const ShoppingCartPageLazy = lazy(async () => {
  const { ShoppingCartPage } = await import('../modules/ShoppingCartPage');

  return { default: ShoppingCartPage };
});

export const NotFoundPageLazy = lazy(async () => {
  const { NotFoundPage } = await import('../modules/NotFoundPage');

  return { default: NotFoundPage };
});
