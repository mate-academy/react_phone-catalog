import { ExtendedProduct } from '../types/ExtendedProduct';
import { Product } from '../types/Product';
import { Category } from '../types/ProductCategory';
import { getAssetPath } from '../utils/getAssetPath';
import { client } from '../utils/httpClient';

export function fetchAllProducts() {
  return client.get<Product[]>(getAssetPath('api/products.json'));
}

export function fetchProductsByCategory(category: Category) {
  return client.get<ExtendedProduct[]>(getAssetPath(`api/${category}.json`));
}
