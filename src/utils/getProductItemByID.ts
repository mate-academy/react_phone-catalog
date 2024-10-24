import { ProductItem } from '../types/ProductItem';

export function getProductItemByID(products: ProductItem[], id: string) {
  return products.find(product => product.id === id);
}
