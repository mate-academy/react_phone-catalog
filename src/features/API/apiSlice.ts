/* eslint-disable max-len */
import { Product } from '../../types/Product';

// export const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/api';
export const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/_new';

export const getProducts: () => Promise<Product[]> = () => {
  return fetch(`${BASE_URL}/products.json`)
    .then((response) => response.json());
};

export const getProductDetails = (productId: string) => {
  return fetch(`${BASE_URL}/products/${productId}.json`)
    .then((response) => response.json());
};
