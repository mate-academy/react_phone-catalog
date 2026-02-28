import accessories from '../../public/api/accessories.json';
import { Product } from '../types/Product';

export const getAccessories = (): Promise<Product[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(accessories);
    }, 500);
  });
};
