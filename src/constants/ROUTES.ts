type RoutesNames =
  | 'HOME'
  | 'PHONES'
  | 'TABLETS'
  | 'ACCESSORIES'
  | 'CART'
  | 'FAVORITES'
  | 'PRODUCT_DETAIL';

export const ROUTES: Record<RoutesNames, string> = {
  HOME: '/',
  PHONES: 'phones',
  TABLETS: 'tablets',
  ACCESSORIES: 'accessories',
  CART: 'cart',
  FAVORITES: 'favorites',
  PRODUCT_DETAIL: ':productId',
} as const;
