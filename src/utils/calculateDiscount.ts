import { Product } from '../types/Product';

export function calculateDiscount(product: Product) {
  const priceDifference = product.fullPrice - product.discountPrice;
  const percentageDiscount = (priceDifference * 100) / product.fullPrice;

  return percentageDiscount;
}
