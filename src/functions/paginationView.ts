export const paginationView = (
  page: number,
  total: number,
  perPage: number,
) => {
  const resultList: (string | number)[] = [];
  const minPage = 1;
  const maxPage = Math.ceil(total / perPage);
  const etc = '...';

  resultList.push(page);

  if (page - 1 > minPage) {
    resultList.unshift(page - 1);
  }

  if (page > 3) {
    resultList.unshift(etc);
  }

  if (page !== minPage) {
    resultList.unshift(minPage);
  }

  if (page + 1 < maxPage) {
    resultList.push(page + 1);
  }

  if (page < maxPage - 2) {
    resultList.push(etc);
  }

  if (page !== maxPage) {
    resultList.push(maxPage);
  }

  return resultList;
};
