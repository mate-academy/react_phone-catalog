export enum SortBy {
  age = 'Newest',
  title = 'Alphabetically',
  price = 'Cheapest',
}

Object.keys(SortBy);

export const SORT_BY_NAME = 'sort';
export const SORT_BY_DEFAULT = SortBy.age;
