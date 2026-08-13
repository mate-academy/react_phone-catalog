import { Product } from '../../../shared/types/Product/Product';

export function getProduct(products: Product[], slug: string) {
  return products.find(currentProduct => currentProduct.id === slug);
}
