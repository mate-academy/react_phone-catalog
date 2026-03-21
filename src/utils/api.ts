import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

export async function fetchProducts<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(
      `Error: ${response.statusText} - ${errorData.message || 'Unknown error'}`,
    );
  }

  return response.json();
}

export function getAllProducts(): Promise<Product[]> {
  return fetchProducts<Product[]>('./api/products.json');
}

export function getSpecificProducts(
  productsType: string,
): Promise<ProductDetails[]> {
  return fetchProducts<ProductDetails[]>(`./api/${productsType}.json`);
}
