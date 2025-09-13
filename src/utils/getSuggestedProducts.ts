import { Product } from '../types/ProductPreview';

export function getSuggestedProducts(products: Product[]): Product[] {
  if (!products || products.length === 0) {
    return [];
  }

  const shuffled = [...products].sort(() => Math.random() - 0.5);

  return shuffled.slice(0, 10);
}
