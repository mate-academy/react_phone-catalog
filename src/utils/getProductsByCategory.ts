import type { Product } from '../types/product';

export function getProductsByCategory(
  category: string | undefined,
  allCategories: string[],
  products: Product[],
) {
  if (!category || !allCategories.includes(category)) {
    return [];
  }

  return products.filter((product) => product.category === category);
}
