import { ProductDetails } from '@/types/ProductDetails';

const ENDPOINTS = {
  phones: '/api/phones.json',
  tablets: '/api/tablets.json',
  accessories: '/api/accessories.json',
};

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

async function get<T>(url: string): Promise<T> {
  await wait(500);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to load data from ${url}`);
  }

  return response.json();
}

export const getPhones = () => get<ProductDetails[]>(ENDPOINTS.phones);
export const getTablets = () => get<ProductDetails[]>(ENDPOINTS.tablets);
export const getAccessories = () =>
  get<ProductDetails[]>(ENDPOINTS.accessories);
