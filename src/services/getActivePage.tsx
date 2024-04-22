export const getActivePage = (currentPage: number, countPages: number) => {
  if (currentPage === 1) {
    return 0;
  }

  if (currentPage === 2) {
    return 1;
  }

  if (currentPage === 4 && countPages === 4) {
    return 3;
  }

  if (currentPage === countPages - 1 && countPages >= 5) {
    return 3;
  }

  if (currentPage === countPages && countPages >= 5) {
    return 4;
  }

  return 2;
};
