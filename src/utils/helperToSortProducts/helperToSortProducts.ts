import { sortVariants } from '../../constans/sortVariants';
import type { Product } from '../../types/products';
import type { SortType } from '../../types/sortType';

export const helperToSortProducts = (
  products: Product[],
  sortBy: SortType,
): Product[] => {
  const sortedProducts = [...products].sort((product1, product2) => {
    switch (sortBy) {
      case sortVariants.Newest:
        return product2.year - product1.year;
      case sortVariants.Oldest:
        return product1.year - product2.year;
      case sortVariants.Cheap:
        return product1.price - product2.price;
      case sortVariants.Expensive:
        return product2.price - product1.price;
      default:
        return 0;
    }
  });

  return sortedProducts;
};
