export enum SortTypes {
  Newest = 'Newest',
  Cheapest = 'Cheapest',
  Alphabetically = 'Alphabetically',
}

export interface Option {
  label: string,
  value: string,
}

export const itemsOnPage = [
  { label: 'All', value: 'All' },
  { label: 'Four', value: '4' },
  { label: 'Eight', value: '8' },
  { label: 'Sixteen', value: '16' },
];

export const sortParam = [
  { label: 'Newest', value: 'Newest' },
  { label: 'Alphabetically', value: 'Alphabetically' },
  { label: 'Cheapest', value: 'Cheapest' },
];
