import { ProductItem } from '../types/ProductItem';
import { client } from './fetch';

export function getProductsByCategory(
  category: string,
): Promise<ProductItem[]> {
  return client.get<ProductItem[]>(`${category}.json`);
}
