import { ProductCagetories } from '../types/ProductCategories';
import { ProductInfo } from '../types/ProductInfo';

export const getFilteredProducts = (
  products: ProductInfo[],
  sortBy: ProductCagetories,
) => {
  return products.filter(p => p.category === sortBy);
};
