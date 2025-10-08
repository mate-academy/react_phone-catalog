import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

async function fetchProducts<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      const message = response.statusText;

      throw new Error(`❌ Failed to fetch ${url}: ${message}`);
    }

    return await response.json();
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : 'Unknown error while fetching data';

    throw new Error(`⚠️ ${errorMessage}`);
  }
}

export function getAllProducts(): Promise<Product[]> {
  return fetchProducts<Product[]>('./api/products.json');
}

export function getProductDetails(
  productsType: string,
): Promise<ProductDetails[]> {
  return fetchProducts<ProductDetails[]>(`./api/${productsType}.json`);
}
