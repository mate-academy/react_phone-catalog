import { ProductSummary } from '../types/ProductSummary';

export function calculateDiscount(product: ProductSummary) {
  const priceDifference = product.fullPrice - product.price;
  const percentageDiscount = (priceDifference * 100) / product.fullPrice;

  return percentageDiscount;
}
