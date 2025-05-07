import { ProductGeneral } from '../types/ProductGeneral';

export function getNewItems(products: ProductGeneral[]) {
  return products
    .filter((product, index) => product.year >= 2022 && index % 3 === 0)
    .reverse();
}
