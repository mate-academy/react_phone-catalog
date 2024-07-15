/* eslint-disable max-len */
import { Categories } from '../types/Categories';
import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

const BASE_API_URL = '../api/';

// const BASE_API_URL =
//   'https://github.com/oksanatytanych/react_phone-catalog/tree/master/public/api/';

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

export async function getCategoryDetails(
  category: string,
): Promise<ProductDetails[]> {
  return fetch(`${BASE_API_URL}/${category}.json`, { mode: 'no-cors' }).then(
    handleResponse,
  );
}

export async function getProductDetails(
  category: string,
  productId: string,
): Promise<ProductDetails | null> {
  const product = getCategoryDetails(category).then(items =>
    items.find(item => item.id === productId),
  );

  return (await product) || null;
}

export async function getDetailsList(
  category: string,
  id: string,
): Promise<ProductDetails[]> {
  return getCategoryDetails(category).then(items =>
    items.filter(item => item.namespaceId === id),
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
