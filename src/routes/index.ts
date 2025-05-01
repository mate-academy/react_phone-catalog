export const ROUTES = {
  HOME: '/',
  PHONES: '/phones',
  TABLETS: '/tablets',
  ACCESSORIES: '/accessories',
  PRODUCT_DETAILS: (category = ':category', productId = ':productId'): string =>
    `/${category}/${productId}`,
  CART: '/cart',
  FAVORITES: '/favorites',
  NOT_FOUND: '*',
} as const;
