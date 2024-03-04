export interface SortList {
  age: string;
  name: string;
  price: string;
}

export interface PaginationList {
  4: string;
  8: string;
  16: string;
  all: string;
}

export type SortParamKeys = keyof SortList;
export type PaginationKeys = keyof PaginationList;
