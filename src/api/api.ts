import { Product } from '../types/Product';

const BASE_URL = `${import.meta.env.BASE_URL}api/products.json`;

async function client<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
}

export const getProducts = () => client<Product[]>(BASE_URL);

export const getProductDetails = (productId: string) =>
  client<Product>(`${import.meta.env.BASE_URL}api/products/${productId}.json`);
