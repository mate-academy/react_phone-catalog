import { Product } from '../types/Product';
import { getRandomNumbers } from './getRandomNumbers';

export function getRandomProducts(products: Product[]): Product[] {
  if (products.length) {
    const uniqIndex = getRandomNumbers(0, products.length - 1, 20);

    const result: Product[] = [];

    for (const ind of uniqIndex) {
      result.push(products[ind]);
    }

    return result;
  }

  return [];
}
