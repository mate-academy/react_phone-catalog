export const ITEMS_PER_PAGE = {
  '4': '4',
  '8': '8',
  '16': '16',
  all: 'all',
} as const;

export type ItemsPerPage =
  | (typeof ITEMS_PER_PAGE)[keyof typeof ITEMS_PER_PAGE]
  | null;
