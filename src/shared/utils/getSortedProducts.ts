import { Product } from '../types/Product';
import { SortOption } from '../types/SortOption';

export const getSortedProducts = (
  allProducts: Product[],
  sortOption: SortOption,
) => {
  let sortedProducts = [...allProducts];

  switch (sortOption) {
    case 'age':
      sortedProducts = allProducts.sort(
        (product1, product2) => product2.year - product1.year,
      );
      break;

    case 'title':
      sortedProducts = allProducts.sort((product1, product2) =>
        product1.name.localeCompare(product2.name),
      );
      break;

    case 'price':
      sortedProducts = allProducts.sort(
        (product1, product2) => product1.price - product2.price,
      );
      break;
  }

  return sortedProducts;
};
