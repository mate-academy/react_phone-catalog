import { Product } from '../types/Product';

export function getHotPriceProducts(hotProducts: Product[]): Product[] {
  const productsWithDiscounts = hotProducts.filter(
    (product) => product.price,
  );

  productsWithDiscounts.sort((a, b) => {
    return a.price - b.price;
  });

  return productsWithDiscounts;
}
