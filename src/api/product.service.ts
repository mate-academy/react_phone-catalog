import { Product } from '@/types/Product';
import { client } from '@/utils/fetchClient';

export function getProducts() {
  return client.get<Product[]>('products.json');
}
