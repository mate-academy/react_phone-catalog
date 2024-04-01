export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export function getList(
  currentPage: number,
  total: number,
  perPage: number | string,
): number[] {
  let startIndex = 0;
  let endIndex = 0;

  if (+perPage) {
    startIndex = (currentPage - 1) * +perPage;
    endIndex = Math.min(startIndex + +perPage, total);
  } else {
    startIndex = 0;
    endIndex = total;
  }

  return [startIndex, endIndex];
}

export function getAmountPage(perPage: string, total: number) {
  let amountOfPage = 0;

  if (perPage !== 'all' && total % +perPage === 0) {
    amountOfPage = Math.floor(total / +perPage);
  } else if (perPage !== 'all' && total % +perPage !== 0) {
    amountOfPage = Math.floor(total / +perPage) + 1;
  } else {
    amountOfPage = total;
  }

  return amountOfPage;
}

export function getCategory(pathname: string) {
  switch (true) {
    case pathname === '/tablets':
      return 'Tablets';
    case pathname === '/phones':
      return 'Phones';
    case pathname === '/accessories':
      return 'Accessories';
    default:
      return '';
  }
}
