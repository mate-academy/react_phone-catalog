import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';
import { ProductWithDetails } from '../types/ProductWithDetails';

// Relative path: works on localhost and on GitHub Pages
const API_URL = 'api';

// Fake network delay, so we can see the Loader while developing
const DELAY = 300;

function wait(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

async function request<T>(endpoint: string): Promise<T> {
  await wait(DELAY);

  const response = await fetch(`${API_URL}/${endpoint}`);

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response.json();
}

export function getProducts(): Promise<Product[]> {
  return request<Product[]>('products.json');
}

export async function getProductDetails(
  itemId: string,
): Promise<ProductWithDetails | null> {
  const products = await getProducts();
  const product = products.find(item => item.itemId === itemId);

  if (!product) {
    return null;
  }

  const allDetails = await request<ProductDetails[]>(
    `${product.category}.json`,
  );
  const details = allDetails.find(item => item.id === itemId);

  return details ? { product, details } : null;
}
