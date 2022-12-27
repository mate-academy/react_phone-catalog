import { Product } from 'src/types/Product';

export function hasProducts(products: Product[], type: string) {
  return products.filter(x => x.type === type).length > 0;
}
