import { ProductDetailed } from '../types/product';

export function getSortedProducts(
  products: ProductDetailed[],
  sort: string | null,
) {
  const result = [...products];

  switch (sort) {
    case 'price':
      return result.sort((a, b) => a.priceDiscount - b.priceDiscount);
    case 'name':
      return result.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return result;
  }
}
