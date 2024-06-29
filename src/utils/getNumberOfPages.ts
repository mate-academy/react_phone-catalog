export function getNumberOfPages(to: number) {
  const numbers = [];

  for (let i = 1; i <= to; i += 1) {
    numbers.push(i);
  }

  return numbers;
}
