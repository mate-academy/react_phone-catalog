export type SortOption = 'Newest' | 'Alphabetically' | 'Cheapest';

export const SORT_OPTIONS: string[] = ['Newest', 'Alphabetically', 'Cheapest'];

export function isSortOption(option: string): option is SortOption {
  return SORT_OPTIONS.includes(option);
}
