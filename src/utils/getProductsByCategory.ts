import { ProductDetails } from '../types/ProductDetails';
import { fetchData } from './fetchData';

export function getProductsByCategory(
  category: string,
): Promise<ProductDetails[]> {
  return fetchData<ProductDetails[]>(`/${category}.json`);
}
