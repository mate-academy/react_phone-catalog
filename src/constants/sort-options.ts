export const SORT_OPTIONS_MAP = {
  Newest: 'Newest',
  Alphabetical: 'Alphabetical',
  Cheapest: 'Cheapest',
  MostExpensive: 'Most Expensive',
} as const;

export const SORT_OPTIONS = Object.values(SORT_OPTIONS_MAP);
