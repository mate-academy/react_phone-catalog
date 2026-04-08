const pagination = <T>(
  itemsPerPage: number,
  items: T[],
  currentPage: number,
) => {
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentItems = items.slice(startIndex, endIndex);

  return {
    currentItems,
    totalPages,
  };
};

export default pagination;
