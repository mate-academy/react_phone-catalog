import { Product, ProductDetails } from '../types';

const BASE_URL = '/api';

async function get<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}/${endpoint}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${response.status}`);
  }

  return response.json();
}

export const getProducts = (): Promise<Product[]> =>
  get<Product[]>('products.json');

export const getPhones = (): Promise<ProductDetails[]> =>
  get<ProductDetails[]>('phones.json');

export const getTablets = (): Promise<ProductDetails[]> =>
  get<ProductDetails[]>('tablets.json');

export const getAccessories = (): Promise<ProductDetails[]> =>
  get<ProductDetails[]>('accessories.json');

export const getProductsByCategory = (
  category: 'phones' | 'tablets' | 'accessories',
): Promise<Product[]> =>
  getProducts().then(products => products.filter(p => p.category === category));

export const getBrandNew = (): Promise<Product[]> =>
  getProducts().then(products => [...products].sort((a, b) => b.year - a.year));

export const getHotPrices = (): Promise<Product[]> =>
  getProducts().then(products =>
    [...products]
      .filter(p => p.fullPrice > p.price)
      .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price)),
  );
