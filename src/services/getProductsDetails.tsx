import { ProductDetails } from '../types/ProductDetails';
import { getData } from '../utils/httpClient';

export function getProductsDetails(
  category: string,
): Promise<ProductDetails[]> {
  return getData<ProductDetails[]>(`${category}.json`);
}
