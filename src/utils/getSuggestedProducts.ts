import { Product } from '../types/Product';

export function getSuggestedProducts(
  products: Product[],
  currentProductId: string,
  count: number = 8,
): Product[] {
  const filtered = products.filter(
    p => p.id?.toString() !== currentProductId.toString(),
  );
  const shuffled = filtered.sort(() => 0.5 - Math.random());

  return shuffled.slice(0, count);
}
