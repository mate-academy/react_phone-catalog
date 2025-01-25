import { Products } from '../types/Products';

export function getTheHotestPrices(products: Products[]): Products[] {
  const productsWithDiscount = products.map(product => ({
    ...product,
    discount: product.fullPrice - product.price,
  }));

  const sortedProducts = productsWithDiscount.sort(
    (a, b) => b.discount - a.discount,
  );

  return sortedProducts.slice(0, 8);
}
