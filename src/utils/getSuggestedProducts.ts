import type { Product } from '../types/Product';

export const getSuggestedProducts = async (
  category: string,
  currentItemId: string,
  count = 12,
): Promise<Product[]> => {
  const response = await fetch('api/products.json');
  const products: Product[] = await response.json();

  return products
    .filter(item => item.category === category)
    .filter(item => item.itemId !== currentItemId)
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
};
