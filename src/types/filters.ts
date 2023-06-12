export type Filter = {
  [key: string]: string;
};

export const filters: Filter = {
  age: 'Newest',
  name: 'Alphabetically',
  price: 'Cheapest',
};

export const pages: Filter = {
  all: 'All',
  4: '4',
  8: '8',
  16: '16',
};
