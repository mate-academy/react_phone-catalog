import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

async function fetchProducts<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(
      `Error: ${response.statusText} - ${errorData.message || 'Unknown error'}`,
    );
  }

  return response.json();
}

export function getProducts(): Promise<Product[]> {
  return fetchProducts<Product[]>('./api/products.json');
}

export async function getProductById(
  id: string,
  category: string,
): Promise<ProductDetails | undefined> {
  const products: ProductDetails[] = await fetchProducts<ProductDetails[]>(
    `./api/${category}.json`,
  );

  return products.find(item => item.id.toLowerCase() === id.toLowerCase());
}
