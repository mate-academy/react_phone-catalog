import products from '../../public/api/products.json';
import { Phone } from '../types/ProductDetails';

const delay = () => new Promise(resolve => setTimeout(resolve, 500));

export const getPhones = (): Promise<Phone[]> => {
  return delay().then(() => products);
};
