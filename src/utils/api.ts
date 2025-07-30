import { Product } from '../types/Product';

export async function fetchProducts<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(
      `${response.statusText} error: ${errorData.message || 'Unknown error'}`,
    );
  }

  return response.json();
}

export function getAllProducts(): Promise<Product[]> {
  return fetchProducts<Product[]>('./api/products.json');
}
