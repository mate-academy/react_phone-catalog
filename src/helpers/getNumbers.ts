export function getNumbers(
  start: number,
  end: number,
): number[] {
  const numbers = [];

  for (let n = start; n <= end; n += 1) {
    numbers.push(n);
  }

  return numbers;
}
