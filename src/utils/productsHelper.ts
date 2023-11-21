import { SortType } from '../types/SortType';
import { Product } from '../types/Product';

export function getFinalPrice(price: number, discount: number) {
  if (!discount) {
    return price;
  }

  return price - price * (discount / 100);
}

export function getPageNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export function getDisplayedProducts(
  allProducts: Product[],
  perPage: string,
  currentPage: number,
) {
  if (perPage === 'all') {
    return [...allProducts];
  }

  const startIndex = +perPage * currentPage - +perPage;
  const endIndex = +perPage * currentPage;

  return [...allProducts].slice(startIndex, endIndex);
}

export function getFilteredProducts(
  allProducts: Product[],
  query: string,
  sortType?: string,
) {
  let filtered = [...allProducts];

  if (query) {
    filtered = filtered.filter(product => product.name.toLowerCase()
      .includes(query.toLowerCase()));
  }

  if (sortType) {
    switch (sortType) {
      case SortType.Alphabetically:
        filtered.sort((product1, product2) => product1.name
          .localeCompare(product2.name));
        break;

      case SortType.Cheapest:
        filtered
          .sort((product1, product2) => product1.price - product2.price);
        break;

      default:
      case SortType.Newest:
        filtered.sort((product1, product2) => product1.age - product2.age);
    }
  }

  return filtered;
}
