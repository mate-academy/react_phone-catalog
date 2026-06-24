export const ITEMS_PER_PAGE_OPTIONS = [4, 8, 16, 'all'] as const;
export type ItemsPerPage = (typeof ITEMS_PER_PAGE_OPTIONS)[number];
export const DEFAULT_ITEMS_PER_PAGE: ItemsPerPage = 16;
export const FIRST_PAGE = 1;
