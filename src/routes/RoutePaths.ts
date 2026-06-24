export const RoutePaths = {
  HOME: '/',
  CATALOG: '/:category',
  PRODUCT: '/:category/:productSlug',
  CART: '/cart',
  FAVORITES: '/favorites',
} as const;
export type RoutePath = (typeof RoutePaths)[keyof typeof RoutePaths];
