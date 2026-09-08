export enum PaginationValues {
  four = '4',
  eight = '8',
  sixteen = '16',
  All = 'All',
}

export enum SortValues {
  Newest = 'Newest',
  Alphabetically = 'Alphabetically',
  Cheapest = 'Cheapest',
}

export interface SearchData {
  searchQuery: string;
  searchRef: string;
}
