import { Product } from '../types/Product';

export function getHotPriceProducts(prods: Product[]) {
  const discountedProducts = prods
    .filter(p => p.fullPrice !== p.price);

  discountedProducts.sort((a, b) => {
    const discountA = a.fullPrice - a.price;
    const discountB = b.fullPrice - b.price;

    return discountB - discountA;
  });

  return discountedProducts;
}
