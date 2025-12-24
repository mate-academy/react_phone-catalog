import { lazy } from 'react';

export const HomePageLazy = lazy(() =>
  import('../pages/Homepage/Homepage').then(({ Homepage }) => ({
    default: Homepage,
  })),
);

export const ProductPageLazy = lazy(() =>
  import('../pages/ProductPage/ProductPage').then(({ ProductPage }) => ({
    default: ProductPage,
  })),
);

export const DetailsPageLazy = lazy(() =>
  import('../pages/DetailsPage/DetailsPage').then(({ DetailsPage }) => ({
    default: DetailsPage,
  })),
);

export const CartPageLazy = lazy(() =>
  import('../pages/CartPage').then(({ CartPage }) => ({
    default: CartPage,
  })),
);

export const FavoritesPageLazy = lazy(() =>
  import('../pages/FavoritesPage').then(({ FavoritesPage }) => ({
    default: FavoritesPage,
  })),
);

// export const LazyNotFoundPage = lazy(() =>
//   import('../pages/NotFoundPage').then(({ NotFoundPage }) => ({
//     default: NotFoundPage,
//   })),
// );
