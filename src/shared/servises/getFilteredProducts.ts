import { ItemsOnPage } from '../types/ItemsOnPage';
import { Product } from '../types/Product';
import { SortBy } from '../types/SortBy';

export const getFilteredProducts = (
  products: Product[],
  query: string,
  sort?: keyof typeof SortBy,
  perPage?: ItemsOnPage,
  page = 1,
): [Product[], number] => {
  let newProducts = [...products];

  newProducts = newProducts.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase()),
  );

  const count = newProducts.length;

  switch (sort) {
    case 'age':
      newProducts.sort((product1, product2) => product2.year - product1.year);
      break;

    case 'name':
      newProducts.sort((product1, product2) =>
        product1.name.localeCompare(product2.name),
      );
      break;

    case 'price':
      newProducts.sort((product1, product2) => product1.price - product2.price);
      break;

    default:
      break;
  }

  switch (perPage) {
    case '4':
    case '8':
    case '16':
      newProducts = newProducts.splice(+perPage * (page - 1), +perPage);
      break;

    default:
      break;
  }

  return [newProducts, count];
};
