import { Category } from '../types/Category';
import { Product } from '../types/Product';

export function getProductsByCategory(
  products: Product[],
  category: Category,
): Product[] {
  return products.filter(product => product.category === category);
}
