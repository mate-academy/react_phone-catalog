export enum SortBy {
  Newest = 'newest',
  Alphabetically = 'alphabetically',
  Cheapest = 'cheapest',
}

export const SORT_OPTIONS = [
  { value: SortBy.Newest, label: 'Newest' },
  { value: SortBy.Alphabetically, label: 'Alphabetically' },
  { value: SortBy.Cheapest, label: 'Cheapest' },
] as const;
