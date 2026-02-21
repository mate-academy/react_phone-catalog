/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchJSON } from './client';
import { Product } from '../types/Product';
import { Category } from '../types/categories';

/**
 * Get products. If a per-category file exists (e.g. /api/phones.json) it will be
 * requested first. If it fails or doesn't exist, fallback to /api/products.json
 * and filter by category on the client.
 */
export async function getProducts(category?: Category): Promise<Product[]> {
  if (category) {
    try {
      return await fetchJSON<Product[]>(`api/${category}.json`);
    } catch (err) {
      // fallback to master file
    }
  }

  const all = await fetchJSON<Product[]>('api/products.json');

  return category ? all.filter(p => p.category === category) : all;
}

export async function getProductDetails(
  idOrItemId: string,
  category?: Category,
): Promise<Product | undefined> {
  // Strict per-category lookup: if category is provided, try that file; otherwise return undefined.
  if (!category) {
    return undefined;
  }

  try {
    const list = await fetchJSON<Product[]>(`api/${category}.json`);
    const found = list.find(
      p => p.id === idOrItemId || (p as any).itemId === idOrItemId,
    );

    return found;
  } catch (e) {
    return undefined;
  }
}
