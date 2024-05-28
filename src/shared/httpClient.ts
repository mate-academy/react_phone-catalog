/* eslint-disable max-len */
import { Categories } from '../types/Categories';
import { Product } from '../types/Product';
import { ProductsDetails } from '../types/ProductsDetails';

// const BASE_API_URL =
//   'https://raw.githubusercontent.com/oksanatytanych/react_phone-catalog/master/public/';

const BASE_API_URL = '/api/';

const handleResponse = (response: Response) => {
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response.json();
};

export async function getProducts(): Promise<Product[]> {
  return fetch(`${BASE_API_URL}products.json`, { mode: 'no-cors' }).then(
    handleResponse,
  );
}

export async function getPhones(): Promise<Product[]> {
  return getProducts().then(items =>
    items.filter(item => item.category === Categories.phones),
  );
}

export async function getTablets(): Promise<Product[]> {
  return getProducts().then(items =>
    items.filter(item => item.category === Categories.tablets),
  );
}

export async function getAccessories(): Promise<Product[]> {
  return getProducts().then(items =>
    items.filter(item => {
      return item.category === Categories.accessoies;
    }),
  );
}

export async function getProductDetails(
  productId: string,
): Promise<ProductsDetails> {
  return fetch(`${BASE_API_URL}/products/${productId}.json`).then(
    handleResponse,
  );
}

export const getHotPriceProducts = (products: Product[]) => {
  return [...products].sort(
    (a, b) => b.fullPrice - b.price - (a.fullPrice - a.price),
  );
};

export const getBrandNewProducts = (products: Product[]) => {
  return [...products].sort((a, b) => b.year - a.year);
};
