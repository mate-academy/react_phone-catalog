export const calculateButtonsQuantity = (
  paginationButtonQuantity: number,
  currentPage: number,
  pageQuantity: number,
): number[] => {
  let arrCiclePagination = [];

  for (
    let i = currentPage;
    i > currentPage - paginationButtonQuantity / 2;
    i--
  ) {
    arrCiclePagination.push(i);
  }

  for (
    let i = currentPage + 1;
    i <= currentPage + paginationButtonQuantity / 2;
    i++
  ) {
    arrCiclePagination.push(i);
  }

  for (let i = 0; i < paginationButtonQuantity; i++) {
    if (arrCiclePagination.some(num => num <= 0)) {
      arrCiclePagination = arrCiclePagination.map(el => el + 1);
    }
  }

  for (let i = 0; i < paginationButtonQuantity; i++) {
    if (arrCiclePagination.some(num => num > pageQuantity)) {
      arrCiclePagination = arrCiclePagination.map(el => el - 1);
    }
  }

  arrCiclePagination = arrCiclePagination.sort((a, b) => a - b);

  return arrCiclePagination;
};
