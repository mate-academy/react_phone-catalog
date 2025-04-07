export interface SearchParams {
  activePageNumber: string;
  firstVisiblePage: string;
  sortBy: string;
  itemsOnPage: string;
}

export type SearchParamsKeys =
  | 'activePageNumber'
  | 'firstVisiblePage'
  | 'sortBy'
  | 'itemsOnPage';

export interface IsSelecting {
  [key: string]: boolean;
}
