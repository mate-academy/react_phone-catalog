export enum SortBy {
  'all' = 'All',
  'year' = 'Newest',
  'price' = 'Cheapest',
  'name' = 'Alphabetically',
}

export type SortByKeys = keyof typeof SortBy;
