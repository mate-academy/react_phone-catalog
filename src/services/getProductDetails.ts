import { getData } from '../helpers/httpClient';
import { ProductDetails } from '../types/ProductDetails';

export function getProductsDetails(
  category: string,
): Promise<ProductDetails[]> {
  return getData<ProductDetails[]>(`${category}.json`);
}
