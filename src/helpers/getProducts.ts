import { Product } from '../types/Product';
import { ProductCategories } from '../types/ProductCategories';

export const getProductsByCategory: (
  category: ProductCategories,
) => Promise<Product[]> = (category: ProductCategories) => {
  // let productsFromApi: Product[] = [];

  return fetch(`/api/${category}.json`)
    .then(response => response.json())
    .then(parsed => {
      return parsed;
    });
};
