import { ProductType } from '../types';

export const isProductInList = (list: ProductType[], itemId: string) => (
  list.some(item => item.id === itemId)
);
