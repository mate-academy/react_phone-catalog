import { Product, ProductId } from "../../../definitions/types/Product";

export type PerPageOption = number | 'All';
export type Pagination = { page: number; perPage: PerPageOption; };
export type NumericPagination = { page: number, perPage: number };

export const enum SortQuery {
  Unsorted = 'unsorted',
  Alphabet = 'alphabetically',
  Newest = 'newest',
  Cheapest = 'cheapest'
}

export enum Category {
  Phones = 'phones',
  Tablets = 'tablets',
  Accessories = 'accessories'
}

export interface QueryOptions {
  ids?: ProductId[];
  category?: Category;
  pagination?: Pagination;
  sortQuery?: SortQuery;
  search?: string | null;
  randomCount?: number,
}

export type ServerResponse = { products: Product[]; amount?: number };
