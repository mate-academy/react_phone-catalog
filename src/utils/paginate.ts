export const paginate = <T>(items: T[], page: number, perPage: number) => {
  const start = (page - 1) * perPage;
  return {
    items: items.slice(start, start + perPage),
    totalPages: Math.ceil(items.length / perPage),
  };
};