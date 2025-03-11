import { Product } from '../types';

export function getPages(arrItems: Product[][]): number[] {
  const result: number[] = [];
  let count: number = 0;

  for (let i = 1; i <= arrItems.length; i++) {
    count++;
    result.push(count);
  }

  return result;
}

export function getArrayItems(
  arrItems: Product[],
  perPage: number,
): Product[][] {
  const result: Product[][] = [];

  for (let i = 0; i < arrItems.length; i += perPage) {
    const arrHelper: Product[] = [];

    for (let j = i; j < i + perPage; j++) {
      if (j < arrItems.length) {
        arrHelper.push(arrItems[j]);
      }
    }

    result.push(arrHelper);
  }

  return result;
}

export function getItemsForPrint(arr: Product[][], value: number): Product[] {
  const result = arr[value - 1];

  return result;
}

export const getVisiblePages = (totalPages: number, currentPage: number) => {
  const visiblePages = 5;
  const halfVisible = Math.floor(visiblePages / 2);

  let startPage = Math.max(1, currentPage - halfVisible);
  const endPage = Math.min(totalPages, startPage + visiblePages - 1);

  if (endPage - startPage + 1 < visiblePages) {
    startPage = Math.max(1, endPage - visiblePages + 1);
  }

  return Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );
};
