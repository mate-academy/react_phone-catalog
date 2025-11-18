import { lazy } from 'react';

export const HomePageLazy = lazy(() =>
  import('../pages/Homepage/Homepage').then(({ Homepage }) => ({
    default: Homepage,
  })),
);

export const ProductPageLazy = lazy(() =>
  import('../pages//ProductPage/ProductPage').then(({ ProductPage }) => ({
    default: ProductPage,
  })),
);
