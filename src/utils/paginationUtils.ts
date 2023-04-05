import { Phone } from '../types/Phone';
import { PerPage } from '../types/PerPage';

export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export function numberOfPages(total: number, perPage: string): number {
  return perPage === PerPage.all ? 1 : Math.ceil(total / Number(perPage));
}

export function currentItems(
  total: Phone [],
  currentPage: number,
  perPage: string,
): Phone[] {
  const start = (currentPage - 1) * +perPage;

  return perPage === PerPage.all ? total : total.slice(start, start + +perPage);
}
