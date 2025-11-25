export const SORT = {
  NEWEST: 'newest',
  ALPHA: 'alphabetically',
  CHEAPEST: 'cheapest',
} as const;

export type SortBy = (typeof SORT)[keyof typeof SORT];
