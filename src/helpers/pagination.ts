export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export function getItemsToShowIndex(
  perPage: string,
  currentPage: number,
  total: number,
) {
  if (perPage === 'all') {
    return [0, total];
  }

  const itemsTo = Math.min(+perPage * currentPage, total);
  const itemsFrom = +perPage * (currentPage - 1);

  return [itemsFrom, itemsTo];
}
