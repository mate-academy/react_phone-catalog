import { Product } from '../../public/api/types/Product';

export const productsCount = (
  products: Array<Product> | null | undefined,
  type: string,
): number => {
  if (!Array.isArray(products) || products.length === 0) {
    return 0;
  }

  return products.filter(p => String(p.category) === String(type)).length;
};
