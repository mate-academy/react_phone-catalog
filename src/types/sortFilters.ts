export interface SortFilters {
  age: string;
  name: string;
  price: string;
}

export interface PerPageFilters {
  4: string;
  8: string;
  16: string;
  all: string;
}

export const sortByList = {
  age: 'Newest',
  name: 'Alphabeticaly',
  price: 'Cheapest',
};

export enum SortType {
  AGE = 'age',
  NAME = 'name',
  PRICE = 'price',
}

export const perPageList = {
  4: '4',
  8: '8',
  16: '16',
  all: 'All',
};

export type SortParamKeys = keyof SortFilters;
export type PerPageKeys = keyof PerPageFilters;
