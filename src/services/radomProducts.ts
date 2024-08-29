import { Product } from '../types/Product';
import { shuffle } from '../utils/shuffle';
import { getProducts } from './products';

export function getSuggestedProducts(): Promise<Product[]> {
  return getProducts()
    .then(products => {
      // Shuffle the selected subset array
      const shuffledProducts = shuffle(products);

      // Select a subset (e.g., 4 products)
      const suggestedProducts = shuffledProducts.slice(0, 10);

      return suggestedProducts;
    })
    .catch(error => {
      /* eslint-disable no-console */
      console.error('Failed to fetch suggested products:', error);

      return [];
    });
}
