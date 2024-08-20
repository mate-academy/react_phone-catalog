import { Product } from '../../types/Product';
import { SortType } from '../../types/SortType';

export const sortProducts = (products: Product[], sortValue: string) => {
  const newProducts = [...products];

  switch (sortValue) {
    case SortType.Newest:
      return newProducts.sort((a, b) => b.year - a.year);
    case SortType.Alphabetically:
      return newProducts.sort((a, b) => a.name.localeCompare(b.name));
    case SortType.Price:
      return newProducts.sort((a, b) => a.price - b.price);
    case SortType.Year:
      return newProducts.sort((a, b) => a.year - b.year);

    case SortType.MaxDiscount:
    case SortType.HotPrice:
      return newProducts.sort((a, b) => {
        const diffA = a.fullPrice - a.price;
        const diffB = b.fullPrice - b.price;

        return diffB - diffA;
      });

    case SortType.Random:
      return newProducts.sort(() => Math.random() - 0.5);

    default:
      return products;
  }
};
