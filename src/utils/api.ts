import phones from '../../public/api/phones.json';
import { Phone } from '../types/ProductDetails';

const delay = () => new Promise(resolve => setTimeout(resolve, 500));

export const getPhones = (): Promise<Phone[]> => {
  return delay().then(() => phones);
};

export const fetchProducts = (): Promise<Phone[]> => {
  return fetch('/api/products')
    .then(response => {
      return response.json();
    })
    .then(data => data as Phone[]);
};
