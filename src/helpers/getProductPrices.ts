import { Product } from '../types/Product';

export const getProductPrices = (product: Product) => {
  if (product.discount === 0) {
    const currentPrice = product.price;
    const fullPrice = product.price;

    return { currentPrice, fullPrice };
  }

  const discountSum = (product.price * product.discount) / 100;
  const currentPrice = product.price - discountSum;
  const fullPrice = product.price;

  return { currentPrice, fullPrice };
};
