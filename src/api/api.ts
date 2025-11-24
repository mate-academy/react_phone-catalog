import { Product } from "@/types";

const ENDPOINTS = {
  products: '/api/products.json',
  // phones: '/api/phones.json',
  // tablets: '/api/tablets.json',
  // accessories: '/api/accessories.json',
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

export const getProducts = () => get<Product[]>(ENDPOINTS.products);
// export const getTablets = () => get<ProductDetails[]>(ENDPOINTS.tablets);
// export const getAccessories = () =>
//   get<ProductDetails[]>(ENDPOINTS.accessories);
