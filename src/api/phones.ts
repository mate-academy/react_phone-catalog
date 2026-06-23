import phones from '../../public/api/phones.json';
import { Product } from '../types/Product';

export const getPhones = (): Promise<Product[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(phones);
    }, 500);
  });
};
