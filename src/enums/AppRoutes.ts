export const AppRoutes = {
  HOME: '/',
  CATEGORY: '/:category',
  PRODUCT_DETAILS: (category = ':category', productId = ':productId'): string =>
    `/${category}/${productId}`,
  PHONES: '/phones',
  TABLETS: '/tablets',
  ACCESSORIES: '/accessories',
  CART: '/cart',
  FAVORITES: '/favorites',
  NOT_FOUND: '*',
} as const;
