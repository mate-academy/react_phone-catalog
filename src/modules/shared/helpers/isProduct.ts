import type { Product } from '../../../types/Product';

/**
 * Cart and Favorites keep whole products in localStorage, so entries written
 * by an older build can still be there with a different shape. Anything that
 * does not carry the fields the UI reads is dropped on load instead of
 * rendering as "undefined" links and NaN prices.
 */
export const isProduct = (value: unknown): value is Product => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const product = value as Partial<Product>;

  return (
    typeof product.itemId === 'string' &&
    typeof product.name === 'string' &&
    typeof product.image === 'string' &&
    typeof product.price === 'number' &&
    typeof product.fullPrice === 'number'
  );
};
