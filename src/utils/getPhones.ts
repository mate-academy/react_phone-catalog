import { ProductGeneral } from '../types/ProductGeneral';

export function getProductByCategory(
  elements: ProductGeneral[],
  category: string,
) {
  const products = elements.filter(element => element.category === category);

  return products;
}
