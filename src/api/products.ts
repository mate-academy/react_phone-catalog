import { request } from './client';
import type { Product } from '../types';
import type { ProductDetails } from '../types';

export async function getProducts(category: Product['category']) {
  const products = await request<Product[]>('./products.json');

  return products.filter(product => product.category === category);
}

export function getAllProducts() {
  return request<Product[]>('/products.json');
}

export async function getProductById(productId: string) {
  const items = await request<Product[]>('/products.json');

  const base = items.find(p => p.itemId === productId);

  if (!base) {
    throw new Error('Product not found in products.json');
  }

  const detailsList = await request<ProductDetails[]>(`/${base.category}.json`);

  const details = detailsList.find(d => d.id === productId);

  if (!details) {
    throw new Error('Product not found in category details file');
  }

  return details;
}
