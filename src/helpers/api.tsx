import { Product } from '../types/Product';

// eslint-disable-next-line max-len
export const MAIN_URL = 'https://mate-academy.github.io/react_phone-catalog/_new';

export const getProducts: () => Promise<Product[]> = () => {
  return fetch(`${MAIN_URL}/products.json`)
    .then(response => response.json());
};

export const getProductDetails = (productId: string) => {
  return fetch(`${MAIN_URL}/products/${productId}.json`)
    .then(result => result.json());
};
