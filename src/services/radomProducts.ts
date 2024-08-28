import { Product } from '../types/Product';
import { shuffle } from '../utils/shuffle';
import { getProducts } from './products';

export function getSuggestedProducts(): Promise<Product[]> {
  return getProducts()
    .then(product => {
      const shuffledProduct = shuffle(product);

      const suggestedProduct = shuffledProduct.slice(0, 10);

      return suggestedProduct;
    })
    .catch(error => {
      /* eslint-disable no-console */
      console.error('Failed to fetch suggested products:', error);

      return [];
    });
}
