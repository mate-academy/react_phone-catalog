import { Product } from '@/shared/types';

export function filterProductsByQuery(
  products: Product[],
  query: string,
): Product[] {
  if (!products || products.length === 0) {
    return [];
  }

  const lowerCaseQuery = query.toLowerCase();

  return products.filter(product =>
    product.name.toLowerCase().includes(lowerCaseQuery),
  );
}
