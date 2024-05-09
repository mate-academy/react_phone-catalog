import { Phone } from '../types/phones';
import { Product } from '../types/products';

// const BASE_URL = 'http://localhost:3000/api';
const BASE_URL = 'https://ogerenko.github.io/react_phone-catalog';
// http://localhost:3000/api/products.json

function wait(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function get<T>(url: string): Promise<T> {
  const fullURL = BASE_URL + url + '.json';

  return wait(300)
    .then(() => fetch(fullURL))
    .then(res => res.json());
}

export const getProducts = () => get<Product[]>('/products');

export const getPhones = () => get<Phone[]>('/phones');
