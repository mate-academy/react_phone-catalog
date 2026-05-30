export type StorageKey = keyof typeof STORAGE_KEYS;

export const STORAGE_KEYS = {
  FAVOURITES: 'myshop:favourites:v1',
  CART: 'myshop:cart:v1',
} as const;
