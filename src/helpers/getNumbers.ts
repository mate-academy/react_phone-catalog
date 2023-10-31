export function getNumbers(num: number): number[] {
  const numbers = [];

  for (let i = 1; i <= num; i += 1) {
    numbers.push(i);
  }

  return numbers;
}
