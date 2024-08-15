export const Sorts = {
  price: 'price',
  year: 'year',
  age: 'age',
  title: 'title',
  newest: 'newest',
  alphabetically: 'alphabetically',
  cheapest: 'cheapest',
} as const;

export type SortsType = keyof typeof Sorts;
