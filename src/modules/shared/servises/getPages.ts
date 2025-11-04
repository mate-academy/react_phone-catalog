import type { Product } from '../types/Product';
import { getSequence } from './createVar';

export const getPages = (itemPerPage: string, productList: Product[]) => {
  switch (itemPerPage) {
    case '4':
    case '8':
    case '16':
      return getSequence(productList.length / +itemPerPage);
    default:
      return ['1'];
  }
};
