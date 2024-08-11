import { Product } from '../types/Product';

export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export const arrangeItems = (
  items: Product[],
  perPage: number,
  currentPage: number,
): Product[] => {
  if (isNaN(perPage)) {
    return [...items];
  }

  const startIndex = perPage * (currentPage - 1);

  return [...items.slice(startIndex, startIndex + perPage)];
};
