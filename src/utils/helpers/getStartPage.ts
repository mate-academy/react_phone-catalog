export const getStartPage = (currentPage: number, lastPageNumber: number) => {
  let startPage = currentPage - 1;

  if (currentPage < 3) {
    startPage = 1;
  }

  if (currentPage >= lastPageNumber - 2) {
    startPage = lastPageNumber - 3;
  }

  return startPage;
};
