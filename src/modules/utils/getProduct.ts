import { Product } from '../shared/components/types/Product';
import { ProductUniversal } from '../shared/components/types/ProductUniversal';

export function getProducts(
  url: string,
): Promise<Product[] & ProductUniversal[]> {
  return fetch(url).then(res => res.json());
}
