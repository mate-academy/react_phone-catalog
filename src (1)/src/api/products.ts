import type { Category, Product } from '../types/Product';
import type { ProductDetails } from '../types/ProductDetails';

const BASE_URL = import.meta.env.BASE_URL;

async function request<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }

  return response.json();
}

export function getProducts(): Promise<Product[]> {
  return request<Product[]>(`${BASE_URL}api/products.json`);
}

export function getProductsByCategory(category: Category): Promise<Product[]> {
  return request<Product[]>(`${BASE_URL}api/${category}.json`);
}

export async function getProductDetails(
  productId: string,
): Promise<ProductDetails | null> {
  const allProducts = await getProducts();
  const shortProduct = allProducts.find(item => item.itemId === productId);

  if (!shortProduct) {
    return null;
  }

  const details = await request<ProductDetails[]>(
    `${BASE_URL}api/${shortProduct.category}.json`,
  );
  const found = details.find(item => item.id === productId);

  return found ?? null;
}

export async function getSuggestedProducts(
  category: Category,
  currentProductId: string,
  count = 10,
): Promise<Product[]> {
  const products = await getProductsByCategory(category);
  const filtered = products.filter(item => item.itemId !== currentProductId);
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);

  return shuffled.slice(0, count);
}
