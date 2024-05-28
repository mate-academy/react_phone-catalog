import { FilterType } from '../types';

export const createPaginationArray = (
  productsCount: number,
  filterValue: FilterType
) =>
  Array.from(
    { length: +filterValue ? Math.ceil(productsCount / +filterValue) : 1 },
    (_, i) => i + 1
  );
