import { Product } from '../type/Product';
import { getBrandNewProducts } from './getProductsByCategories';

type FilterParams = {
  sortBy: string;
  query: string;
  filter: string;
};

export function getFilteredPhones(
  products: Product[],
  sort: FilterParams,
) {
  const {
    sortBy,
    filter,
    query,
  } = sort;

  const visiblePhones = filter
    ? products.filter(el => el.category === filter)
    : [...products];

  if (query) {
    const lowerQuery = query.toLowerCase().trim().toString();

    return visiblePhones.filter(product => {
      return Object.values(product)
        .some(value => value.toString().toLowerCase().includes(lowerQuery));
    });
  }

  if (sortBy) {
    switch (sortBy) {
      case 'age':
        return getBrandNewProducts(visiblePhones);

      case 'name':
        visiblePhones.sort((phone1, phone2) => {
          return phone1.name.localeCompare(phone2.name);
        });
        break;

      case 'price':
        visiblePhones.sort((phone1, phone2) => {
          return phone1.price - phone2.price;
        });
        break;

      default:
        throw new Error(
          'There are no phones matching the current search criteria',
        );
    }
  }

  return visiblePhones;
}
