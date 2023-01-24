export enum SortMethod {
  age = 'Newest',
  name = 'Name',
  price = 'Cheapest',
}

export type SortKeys = keyof typeof SortMethod;
