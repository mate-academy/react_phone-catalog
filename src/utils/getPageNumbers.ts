import { getNumbers } from './getNumbers';

export function getPageNumbers(
  itemsTotal: number,
  itemsPerPage: number,
): number[] {
  return getNumbers(1, Math.ceil(itemsTotal / itemsPerPage));
}
