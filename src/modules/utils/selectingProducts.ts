import { Product } from '../shared/components/types/Product';

type ProductsSorting = 'hot' | 'brand-new';

export const selectingProducts = (
  products: Product[],
  sorting: ProductsSorting,
) => {
  switch (sorting) {
    case 'hot':
      return [...products].sort((a, b) => b.year - a.year).slice(0, 20);
    case 'brand-new':
      return [...products]
        .sort((a, b) => b.fullPrice - a.fullPrice)
        .slice(0, 20);

    default:
      return products;
  }
};
