import { ProductGeneral } from '../types/ProductGeneral';
import { Product } from '../types/Product';

export function getProductByCategory(
  elements: ProductGeneral[],
  category: string,
) {
  const products = elements.filter(element => element.category === category);

  return products;
}

export function getProductById(elements: Product[], id: string) {
  return elements.find(element => element.id === id);
}
