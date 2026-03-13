import type { Product } from '../types/Product';

const CAPACITY_EXTRA: Record<string, number> = {
  '64gb': 0,
  '128gb': 100,
  '256gb': 200,
  '512gb': 350,
  '1tb': 600,
};

function normalize(capacity: string): string {
  return capacity
    .toLowerCase()
    .replace(/\s+/g, ''); 
}

export function getProductPrice(
  product: Product,
  capacity: string
): number {
  const base =
    product.priceDiscount ?? product.priceRegular;

  const key = normalize(capacity);
  const extra = CAPACITY_EXTRA[key] ?? 0;

  return base + extra;
}