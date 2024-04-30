export enum SortMethod {
  age = 'Newest',
  name = 'Name',
  price = 'Cheapset',
}

export enum ItemsOnPage {
  eight = '8',
  sixteen = '16',
  all = 'All',
}

export type SortKeys = keyof typeof SortMethod;
