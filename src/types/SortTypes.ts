export enum SortTypes {
  Newest = 'Newest',
  Alphabetically = 'Alphabetically',
  Cheapest = 'Cheapest',
}

// export const sortParam = [
//   { Newest: 'Newest' },
//   { Alphabetically: 'Alphabetically' },
//   { Cheapest: 'Cheapest' },
// ];

// export const itemsOnPage = [
//   { All: 'All' },
//   { Four: '4' },
//   { Eight: '8' },
//   { Eight: '16' },
// ];

export interface Option {
  label: string;
  value: string;
}

export const sortParam = [
  { label: 'Newest', value: 'Newest' },
  { label: 'Alphabetically', value: 'Alphabetically' },
  { label: 'Cheapest', value: 'Cheapest' },
];

export const itemsOnPage = [
  { label: 'All', value: 'All' },
  { label: 'Four', value: '4' },
  { label: 'Eight', value: '8' },
  { label: 'Sixteen', value: '16' },
];
