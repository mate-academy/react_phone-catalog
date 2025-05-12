import { Product } from 'shared/types/Product';
import { BaseProductDetails } from 'shared/types/ProductDetails';

import { client } from './httpClient';

export function getAllProducts() {
  return client.get<Product[]>('/products.json');
}

export function getProductsByCategory(
  category: string,
): Promise<BaseProductDetails[]> {
  return client.get<BaseProductDetails[]>(`/${category}.json`);
}

export function getSuggestedProducts(
  productsByCategory: Product[],
  id: string,
): Product[] {
  const filteredProducts = productsByCategory.filter(p => p.id !== id);
  const shuffledProducts = filteredProducts.sort(() => Math.random() - 0.5);

  return shuffledProducts;
}
