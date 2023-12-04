export function getNumbers(start: number, end: number): number[] {
  const numbers = [];

  for (let i = start; i <= end; i += 1) {
    numbers.push(i);
  }

  return numbers;
}
