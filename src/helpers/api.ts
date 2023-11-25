import { Product } from '../types/Product';

const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/api';

export const getProducts = (): Promise<Product[]> => {
  const URL = `${BASE_URL}/products.json`;

  return fetch(URL)
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      throw new Error();
    });
};

export const getProductDetails
= (productId: string | undefined): Promise<Product> => {
  const URL = `${BASE_URL}/products/${productId}.json`;

  return fetch(URL)
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      throw new Error();
    });
};
