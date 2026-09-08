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

  return {
    items: items.slice(start, start + perPage),
    totalPages: Math.ceil(items.length / perPage),
  };
};
