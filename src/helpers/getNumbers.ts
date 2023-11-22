export function getNumbers(from: number, to: number): string[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n.toString());
  }

  return numbers;
}
