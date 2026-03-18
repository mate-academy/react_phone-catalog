import { ExtendedProduct } from '../types/ExtendedProduct';
import { Product } from '../types/Product';
import { Category } from '../types/ProductCategory';
import { client } from '../utils/httpClient';

export function fetchAllProducts() {
  return client.get<Product[]>('/products.json');
}

export function fetchProductsByCategory(category: Category) {
  return client.get<ExtendedProduct[]>(`/${category}.json`);
}
