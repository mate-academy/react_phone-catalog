import { Product } from '../types/Product';
import { getRandomProducts } from './getRandomProducts';

export const BASE_URL = 'https://valost.github.io/react_phone-catalog/';

export function getData<T>(url: string): Promise<T> {
  return fetch(BASE_URL + url).then(response => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(`Failed to load data from ${url}`);
  });
}

export const getProducts = (): Promise<Product[]> => {
  return getData<Product[]>('/api/products.json');
};

export const getNewProducts = () => {
  return getProducts().then(products =>
    products.sort((a, b) => b.fullPrice - a.fullPrice).slice(0, 12),
  );
};

export const getProductsByCategory = async (category: string) => {
  return getProducts().then(products =>
    products.filter(product => product.category === category),
  );
};

export const getHotPriceProducts = () => {
  return getProducts().then(products =>
    products
      .filter(product => product.fullPrice > product.price)
      .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
      .slice(0, 12),
  );
};

export const getSuggestedProducts = () => {
  return getProducts().then(products => getRandomProducts(products));
};
