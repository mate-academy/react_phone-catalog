export const DEFAULT_SORT = 'age';
export const DEFAULT_PER_PAGE = '16';
export const PAGINATION_WINDOW = 4;

export const getPaginationItems = (page: number, totalPages: number) => {
  const items: number[] = [];
  let start = Math.max(1, page - Math.floor((PAGINATION_WINDOW - 1) / 2));
  const end = Math.min(totalPages, start + PAGINATION_WINDOW - 1);

  if (end - start + 1 < PAGINATION_WINDOW) {
    start = Math.max(1, end - PAGINATION_WINDOW + 1);
  }

  for (let i = start; i <= end; i++) {
    items.push(i);
  }

  return items;
};

export const getSkeletonCount = (perPage: string) =>
  perPage === 'all' ? Number(DEFAULT_PER_PAGE) : Number(perPage);
