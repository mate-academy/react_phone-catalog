import { ItemsOnPage } from '../types/ItemsOnPage';
import { SortBy } from '../types/SortBy';
import { UpgradedProduct } from '../types/UpgradedProduct';

export const getTrimmedProducts = (
  products: UpgradedProduct[],
  query: string,
  sort?: keyof typeof SortBy,
  perPage?: ItemsOnPage,
  page = 1,
): [UpgradedProduct[], number] => {
  let newProducts = [...products];

  newProducts = newProducts
    .filter(item => item.name.toLowerCase().includes(query.toLowerCase()));

  const count = newProducts.length;

  switch (sort) {
    case 'age':
      newProducts.sort(
        (item1, item2) => item2.year - item1.year,
      );
      break;

    case 'name':
      newProducts.sort(
        (item1, item2) => item1.name.localeCompare(item2.name),
      );
      break;

    case 'price':
      newProducts.sort(
        (item1, item2) => item1.price - item2.price,
      );
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
