import { Category } from '../types/Category';
import { Product } from '../types/Product';

export function countProductsInCategory(
  products: Product[],
  category: Category,
): number {
  return products.reduce((acc, product) => {
    if (product.category === category) {
      return acc + 1;
    }

    return acc;
  }, 0);
}
