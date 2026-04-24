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
