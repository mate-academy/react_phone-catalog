import type { ProductDetails } from '@/types/ProductDetails';
import type { Product } from '@/types/Product';

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

const apiCache = new Map<string, Promise<unknown> | unknown>();

async function get<T>(url: string): Promise<T> {
  const cached = apiCache.get(url);

  if (cached) {
    return cached instanceof Promise ? ((await cached) as T) : (cached as T);
  }

  const request = (async () => {
    await wait(500);
    const response = await fetch(BASE_URL + url);

    if (!response.ok) {
      throw new Error(`Failed to load data from ${url}`);
    }

    return response.json();
  })();

  apiCache.set(url, request);
  const data = await request;

  apiCache.set(url, data);

  return data;
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

export const getSuggestedProducts = async () => {
  const products = await getProducts();
  const shuffle = <T>(array: T[]): T[] =>
    [...array].sort(() => Math.random() - 0.5);
  const randomCount = Math.floor(Math.random() * 10) + 3;

  return shuffle(products).slice(0, randomCount);
};
