type PerPage = number | 'all';

export const getIndexes = (
  perPage: PerPage,
  currentPage: number,
  totalProducts?: number,
) => {
  if (perPage === 'all') {
    return {
      firstIndex: 0,
      lastIndex: totalProducts,
    };
  }

  let lastIndex = 0;
  let firstIndex = 0;

  if (perPage < 3) {
    firstIndex = currentPage - 1;
    lastIndex = firstIndex + 2;
  } else if (perPage < 4) {
    firstIndex = currentPage - 1;
    lastIndex = firstIndex + 3;
  } else {
    lastIndex = currentPage * perPage;
    firstIndex = lastIndex - perPage;
  }

  return { firstIndex, lastIndex };
};
