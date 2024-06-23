import { FilterItems } from '../types/FilterItems';
import { Product } from '../types/Product';

export function getCorrectArrayProducts(
  products: Product[],
  filterItems: FilterItems,
  currentPage: number,
) {
  const { filter, count } = filterItems;

  const newProducts = [...products];

  switch (filter) {
    case 'name': {
      newProducts.sort((phone1, phone2) =>
        phone2.name.localeCompare(phone1.name),
      );
      break;
    }

    case 'price': {
      newProducts.sort((phone1, phone2) => phone1.price - phone2.price);
      break;
    }

    default:
      newProducts.sort((phone1, phone2) => phone2.year - phone1.year);
      break;
  }

  if (count === 'all') {
    return newProducts;
  }

  return newProducts.slice((currentPage - 1) * +count, +count * currentPage);
}
