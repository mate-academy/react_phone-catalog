import { Product } from '../types/Product';

export const shuffleArrays = (array: Product[]) => {
  return array.sort(() => Math.random() - 0.5);
};
