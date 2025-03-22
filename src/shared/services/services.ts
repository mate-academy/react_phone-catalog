import { Product } from 'shared/types/Product';

import { client } from './httpClient';

export function getAllProducts() {
  return client.get<Product[]>('/products.json');
}

export function getProductsByCategory(category: string): Promise<Product[]> {
  return client.get<Product[]>(`/${category}.json`);
}
