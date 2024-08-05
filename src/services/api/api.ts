import { FullProduct } from '../../types/FullProduct';
import { Product } from '../../types/Product';

const API_URL = 'api/products.json';

function sleep(delay: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, delay));
}

async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }

  return response.json();
}

export async function getProductsWithDelay(): Promise<Product[]> {
  await sleep(1000);

  return fetchProducts();
}

export async function getProductsByCategory(
  category: string,
): Promise<Product[]> {
  const products = await getProductsWithDelay();

  return products.filter(product => product.category === category);
}

export async function getProductById(category: string): Promise<FullProduct[]> {
  await sleep(1000);

  const response = await fetch(`api/${category}.json`);

  if (!response.ok) {
    throw new Error(`Failed to fetch product by ID: ${response.statusText}`);
  }

  return response.json();
}
