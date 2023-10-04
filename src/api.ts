import { Product } from './types/Product';

const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/api';

export function fetchProducts(): Promise<Product[]> {
  const URL = `${BASE_URL}/products.json`;

  return fetch(URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      return response.json();
    });
}

export function fetchPhones(): Promise<Product[]> {
  return fetchProducts()
    .then(response => response.filter(product => product.type === 'phone'));
}

export function fetchTablets(): Promise<Product[]> {
  return fetchProducts()
    .then(response => response.filter(product => product.type === 'tablet'));
}

export function fetchAccessories(): Promise<Product[]> {
  return fetchProducts()
    .then(response => response.filter(product => product.type === 'accessory'));
}

export const fetchProductDetails = (
  productId: string,
): Promise<Product> => {
  const URL = `${BASE_URL}/products/${productId}.json`;

  return fetch(URL)
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      throw new Error(res.statusText);
    });
};

export function fetchGeneralProductDetails(
  productId: string,
): Promise<Product | undefined> {
  return fetchProducts()
    .then(response => {
      const result = response.find(product => product.id === productId);

      return result;
    });
}

export function fetchCompleteDetails(productId: string): Promise<Product> {
  return Promise.all([
    fetchGeneralProductDetails(productId),
    fetchProductDetails(productId),
  ]).then(([res1, res2]) => ({ ...res1, ...res2 }));
}
