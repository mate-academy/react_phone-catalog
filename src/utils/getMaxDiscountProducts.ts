import { Product } from '../types/Product';

export function getMaxDiscountProducts(products: Product[]): Product[] {
  const maxDiscount = Math.max(
    ...products.map(product => product.fullPrice - product.price),
  );

  return products.filter(
    product => product.fullPrice - product.price === maxDiscount,
  );
}
