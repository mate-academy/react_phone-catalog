import { Gadget } from '../types/Gadget';
import { Sort } from '../types/Sort';

export const sortProducts = (
  products: Gadget[],
  sortCriteria: Sort,
): Gadget[] => {
  switch (sortCriteria) {
    case Sort.BY_YEAR:
      return [...products].sort((a, b) => b.year - a.year);
    case Sort.BY_NAME:
      return [...products].sort((a, b) => a.name.localeCompare(b.name));
    case Sort.BY_PRICE:
      return [...products].sort((a, b) => a.price - b.price);
    default:
      return products;
  }
};

export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export const normalizeColor = (color: string): string => {
  return color.replace(/\s+/g, '-').toLowerCase();
};
