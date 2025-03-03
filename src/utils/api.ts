import phones from '../../public/api/phones.json';
import product from '../../public/api/products.json';
import { Phone } from '../types/ProductDetails';
import { Product } from '../types/typeRpoduct';

const delay = () => new Promise(resolve => setTimeout(resolve, 500));

export const getPhones = (): Promise<Phone[]> => {
  return delay().then(() => phones);
};

export const fetchProducts = (): Promise<Product[]> => {
  return delay().then(() => product);
};
