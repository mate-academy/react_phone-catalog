import { Product } from '../types/Product';

export function getTheHotestPrices(products: Product[]): Product[] {
  const productsWithDiscount = products.map(product => ({
    ...product,
    discount: product.fullPrice - product.price,
  }));

  const sortedProducts = productsWithDiscount.sort(
    (a, b) => b.discount - a.discount,
  );

  return sortedProducts.slice(0, 8);
}
