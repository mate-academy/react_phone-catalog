import tablets from '../../public/api/tablets.json';
import { Product } from '../types/Product';

export const getTablets = (): Promise<Product[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(tablets);
    }, 500);
  });
};
