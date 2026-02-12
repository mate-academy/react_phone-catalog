export const SORT_OPTIONS = [
  'new',
  'old',
  'alphabetically',
  'cheapest',
  'expensive',
] as const;
export type Sort = (typeof SORT_OPTIONS)[number];
