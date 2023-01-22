import { Product } from 'src/types/Product';

export function getTotalProducts(products: Product[]) {
  let count = 0;

  for (let i = 0; i < products.length; i += 1) {
    count += products[i].count || 1;
  }

  return count;
}
