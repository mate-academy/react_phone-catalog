export const usePagination = <T>(
  items: T[],
  page: number,
  perPage: number | 'all',
) => {
  if (perPage === 'all') {
    return {
      items,
      totalPages: 1,
    };
  }

  const start = (page - 1) * perPage;
  const end = start + perPage;

  const paginatedItems = items.slice(start, end);

  const totalPages = Math.ceil(items.length / perPage);

  return {
    items: paginatedItems,
    totalPages,
  };
};
