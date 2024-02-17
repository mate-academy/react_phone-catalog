export enum SortBy {
  Newest = 'Newest',
  Alphabetically = 'Alphabetically',
  Cheapest = 'Cheapest',
}
export type SelectItems = PerPage | SortBy;
export type PerPage = 'all' | '16' | '8' | '4';

export type SortParams = 'age' | 'name' | 'price';

export type SelectOption = {
  [key in string]: SelectItems;
};

export type PerPageSelect = {
  [key in string]: PerPage;
};

export type SearchTypes = 'sort' | 'page' | 'perPage';
