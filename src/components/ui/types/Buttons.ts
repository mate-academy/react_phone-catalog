export const ButtonSize = {
  Home: 'home',
  Catalog: 'catalog',
  ItemCard: 'itemCard',
  Cart: 'cart',
  YouMayLike: 'youMayLike',
} as const;

export type ButtonSize = (typeof ButtonSize)[keyof typeof ButtonSize];
