import { Product } from '../types/Product';

export const isItemInArray = (array: Product[], itemId: number): boolean => {
  return array.some(item => item.id === itemId);
};
