import { Product } from '../typies';

const BASE_URL = './api/products.json';

export const getProducts = async (): Promise<Product[]> => {
  return fetch(BASE_URL).then(response => response.json());
};
