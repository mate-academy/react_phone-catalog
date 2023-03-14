import { Product } from '../types/Product';
import { SortType } from '../types/SortType';

export type Props = {
  products: Product[];
};

export const sortProducts = (products: Product[], sortValue: string) => {
  switch (sortValue) {
    case SortType.Newest:
      return products.sort((a, b) => a.name.localeCompare(b.name));
    case SortType.Alphabetically:
      return products.sort((a, b) => a.year - b.year);
    case SortType.Price:
      return products.sort((a, b) => a.price - b.price);
    case SortType.Year:
      return products.sort((a, b) => a.year - b.year);

    case SortType.MaxDiscount:
      return products.sort((a, b) => {
        const diffA = a.fullPrice - a.price;
        const diffB = b.fullPrice - b.price;

        return diffA - diffB;
      });

    case SortType.Random:
      return products.sort(() => Math.random() - 0.5);

    default:
      return products;
  }
};
