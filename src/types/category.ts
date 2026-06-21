export const CATEGORIES = ['phones', 'tablets', 'accessories'] as const;
export type Category = (typeof CATEGORIES)[number];
export type SortBy = 'newest' | 'alphabetically' | 'cheapest';
