export const AppRoute = {
  HOME: '/',
  CATEGORY: '/:category',
  PRODUCT_DETAILS: (category = ':category', productId = ':productId'): string =>
    `/${category}/${productId}`,
  PHONES: '/phones',
  TABLETS: '/tablets',
  ACCESSORIES: '/accessories',
  CART: '/cart',
  FAVOURITES: '/favourites',
  NOT_FOUND: '*',
} as const;
