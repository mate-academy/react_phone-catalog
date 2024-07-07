import { ProductGeneral } from '../types/ProductGeneral';

export function getHotPrices(products: ProductGeneral[]) {
  const difference = 60;

  return products.filter(
    product => product.fullPrice - product.price > difference,
  );
}
