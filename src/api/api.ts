import { ProductDetails } from '@/types/ProductDetails';
import { Product } from '../types/Product';

const BASE_URL =
  window.location.hostname === 'localhost' ? '' : '/react_phone-catalog';
const ENDPOINTS = {
  products: '/api/products.json',
  phones: '/api/phones.json',
  tablets: '/api/tablets.json',
  accessories: '/api/accessories.json',
};
type Category = keyof typeof ENDPOINTS;
function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

async function get<T>(url: string): Promise<T> {
  await wait(500);
  const response = await fetch(BASE_URL + url);

  if (!response.ok) {
    throw new Error(`Failed to load data from ${url}`);
  }

  return response.json();
}

export const getProducts = () => get<Product[]>(ENDPOINTS.products);
export const getProductDetails = (category: string | undefined) => {
  if (!category) {
    throw new Error('Category is missing');
  }

  if (!(category in ENDPOINTS)) {
    throw new Error(`Unknown category: ${category}`);
  }

  return get<ProductDetails[]>(ENDPOINTS[category as Category]);
};
// export const getTablets = () => get<Product[]>(ENDPOINTS.tablets);
// export const getAccessories = () => get<Product[]>(ENDPOINTS.accessories);
