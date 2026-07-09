import { ProductPreview } from '../types';

export type SortBy =
  | 'year-abc'
  | 'year-desc'
  | 'price-abc'
  | 'price-desc'
  | 'name-abc'
  | 'name-desc'
  | 'recommended';

export const prepereProducts = (
  products: ProductPreview[],
  category: string,
  sortBy?: SortBy,
) => {
  const list = products
    .filter(product => product.category === category)
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-abc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'year-abc':
          return a.year - b.year;
        case 'year-desc':
          return b.year - a.year;
        case 'name-abc':
          return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        case 'name-desc':
          return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
        case 'recommended':
          return Math.random() - 0.5;

        default:
          return 0;
      }
    });

  return list;
};
