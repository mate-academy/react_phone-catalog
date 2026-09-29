import { Product, ProductDetails } from '@/shared/types';

async function request<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${url}`);
  }

  return (await response.json()) as T;
}

export function getProducts(): Promise<Product[]> {
  return request<Product[]>(`${import.meta.env.BASE_URL}api/products.json`);
}

export function getProductDetails(category: string): Promise<ProductDetails[]> {
  return request<ProductDetails[]>(
    `${import.meta.env.BASE_URL}api/${category}.json`,
  );
}
