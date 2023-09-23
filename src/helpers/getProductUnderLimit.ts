import { Product } from '../types/Product';

export function getProductsUnderLimit(
  limit: number, page: number, products: Product[],
): Product[] {
  const startIndex = page * limit - limit;
  const endIndex = page * limit;
  const limitedProducts = products.slice(startIndex, endIndex);

  return limitedProducts;
}
