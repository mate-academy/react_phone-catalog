import { Category } from '../types/Category';
import { Product } from '../types/Product';

export const getProductsByCategory = (
  products: Product[],
  category: Category,
) => {
  return [...products].filter(product => product.category === category);
};
