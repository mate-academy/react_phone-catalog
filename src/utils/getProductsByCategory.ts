import { Product } from '../types/Product';
import { Category } from '../types/ProductCategory';

export const getProductsByCategory = (
  products: Product[],
  category: Category,
) => products.filter(product => product.category === category);
