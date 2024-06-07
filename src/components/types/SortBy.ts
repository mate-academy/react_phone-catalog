const SORT_BY = {
  Newest: 'newest',
  Alphabetical: 'alphabetical',
  Cheapest: 'cheapest',
} as const;

export type SortBy = (typeof SORT_BY)[keyof typeof SORT_BY];
