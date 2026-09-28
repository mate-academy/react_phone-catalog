export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n++) {
    numbers.push(n);
  }

  return numbers;
}
