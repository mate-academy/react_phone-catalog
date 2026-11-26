import type {
  Product,
  ProductCategory,
  ProductDetails,
} from '../types/Product';
import { assetUrl } from '../utils';

const delay = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export async function getProducts(): Promise<Product[]> {
  await delay(300);

  return fetchJson<Product[]>(assetUrl('api/products.json'));
}

export async function getProductsByCategory(
  category: ProductCategory,
): Promise<Product[]> {
  await delay(300);
  const products = await fetchJson<Product[]>(assetUrl('api/products.json'));

  return products.filter(product => product.category === category);
}

export async function getProductDetails(
  category: ProductCategory,
  itemId: string,
): Promise<ProductDetails | undefined> {
  await delay(300);
  const products = await fetchJson<ProductDetails[]>(
    assetUrl(`api/${category}.json`),
  );

  return products.find(product => product.id === itemId);
}

export async function getSuggestedProducts(count = 8): Promise<Product[]> {
  await delay(300);
  const products = await fetchJson<Product[]>(assetUrl('api/products.json'));
  const shuffled = [...products].sort(() => Math.random() - 0.5);

  return shuffled.slice(0, count);
}

export async function getHotPriceProducts(): Promise<Product[]> {
  await delay(300);
  const products = await fetchJson<Product[]>(assetUrl('api/products.json'));

  return [...products].sort(
    (a, b) => b.fullPrice - b.price - (a.fullPrice - a.price),
  );
}

export async function getNewProducts(): Promise<Product[]> {
  await delay(300);
  const products = await fetchJson<Product[]>(assetUrl('api/products.json'));

  return [...products].sort((a, b) => b.year - a.year);
}
