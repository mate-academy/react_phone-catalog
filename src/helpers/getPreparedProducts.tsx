import { UpgratedProduct } from '../types/UpgratedProduct';
import { ItemsPerPage } from '../types/itemsPerPage';
import { SortBy } from '../types/sortBy';

export const getPreparedProducts = (
  products: UpgratedProduct[],
  query: string,
  sort?: keyof typeof SortBy,
  perPage?: ItemsPerPage,
  page = 1,
): [UpgratedProduct[], number] => {
  let newProducts = [...products];

  newProducts = newProducts.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase()),
  );

  const count = newProducts.length;

  switch (sort) {
    case 'age':
      newProducts.sort((a, b) => b.year - a.year);
      break;

    case 'price':
      newProducts.sort((a, b) => a.price - b.price);
      break;

    case 'name':
      newProducts.sort((a, b) => a.name.localeCompare(b.name));
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
