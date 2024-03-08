import { ProductExtended } from '../types/ProductExtended';
import { Sorting } from '../types/Sorting';
import { PerPage } from '../types/PerPage';

export const getFilteredProducts = (
  products: ProductExtended[],
  query: string,
  page = 1,
  perPage?: PerPage,
  sort?: keyof typeof Sorting,
): [ProductExtended[], number] => {
  let filteredProducts = [...products];

  filteredProducts = filteredProducts.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase()),
  );

  const productsCount = filteredProducts.length;

  switch (sort) {
    case 'age':
      filteredProducts.sort((item1, item2) => item1.year - item2.year);
      break;

    case 'name':
      filteredProducts.sort((item1, item2) =>
        item1.name.localeCompare(item2.name),
      );
      break;

    case 'price':
      filteredProducts.sort((item1, item2) => item1.price - item2.price);
      break;

    default:
      break;
  }

  switch (perPage) {
    case PerPage.four:
    case PerPage.eight:
    case PerPage.sixteen:
      filteredProducts = filteredProducts.splice(
        +perPage * (page - 1),
        +perPage,
      );
      break;

    default:
      break;
  }

  return [filteredProducts, productsCount];
};
