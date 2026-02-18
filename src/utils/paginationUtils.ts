export const getVisiblePages = (
  currentPage: number,
  totalPages: number,
  pagesToShow: number = 4,
): number[] => {
  if (totalPages <= pagesToShow) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  let startPage = currentPage - 1;

  if (startPage < 1) {
    startPage = 1;
  }

  let endPage = startPage + pagesToShow - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - pagesToShow + 1);
  }

  return Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );
};
