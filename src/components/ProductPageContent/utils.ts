import { DropDownOption } from '../../types/DropDownOptions';
import { Product } from '../../types/Product';

export const sortOptions: DropDownOption[] = [
  { name: 'Newest', value: 'age' },
  { name: 'Alphabetically', value: 'name' },
  { name: 'Cheapest', value: 'price' },
];

export const paginationOptions: DropDownOption[] = [
  { name: '4', value: '4' },
  { name: '8', value: '8' },
  { name: '16', value: '16' },
  { name: 'All', value: 'all' },
];

const trimQuery = (query: string) => query.trim().toLowerCase();

export const getFilterProducts = (
  products: Product[],
  sortType: string | null,
  perPage: string,
  currentPage: number,
): Product[] => {
  const preparedProducts = [...products];

  if (sortType) {
    preparedProducts.sort((product1, product2) => {
      switch (sortType) {
        case 'name':
          return product1.name.localeCompare(product2.name);

        case 'price':
          return product1.price - product2.price;

        case 'age':
          return product2.year - product1.year;

        default:
          return 0;
      }
    });
  }

  if (perPage === 'all') {
    return preparedProducts;
  }

  const indexOfLastProduct = currentPage * +perPage;
  const indexOfFirstProduct = indexOfLastProduct - +perPage;

  return preparedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
};

export const filterQuery = (items: Product[], query: string) => {
  const trimmedQuery = trimQuery(query);

  if (trimmedQuery) {
    return items.filter(prod => trimQuery(prod.name)
      .includes(trimmedQuery));
  }

  return items;
};
