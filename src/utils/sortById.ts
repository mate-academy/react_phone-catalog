import { Products } from '../types/Products';

export function sortById(products: Products[]): Products[] {
  return [...products].sort((product1, product2) => product2.id - product1.id);
}
