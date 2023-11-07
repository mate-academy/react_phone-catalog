export const getEndPage = (currentPage: number, lastPageNumber: number) => {
  let endItem = currentPage + 1;

  if (currentPage === 1) {
    endItem = currentPage + 2;
  }

  if (currentPage >= lastPageNumber - 2) {
    endItem = lastPageNumber;
  }

  return endItem;
};
