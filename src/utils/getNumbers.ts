export function getNumbers(from: number, to: number): number[] {
  const numbers: number[] = [];

  for (let i = from; i <= to; i++) {
    numbers.push(i);
  }

  return numbers;
}
